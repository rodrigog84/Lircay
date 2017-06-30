Ext.define('Infosys_web.controller.Productos', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Productos',
             'Ubicas', 
             'productos.Items', 
             'Existencias2',
             'productos.Selector'],

    models: ['Producto',
             'Ubica', 
             'Productos.Item'],

    views: ['productos.Principal', 'productos.BuscarProductos', 
            'productos.Ingresar',  'productos.Desplegar',
            'productos.Productos', 'ventas.Facturas', 
            'productos.detalle_existenciasproductos', 'productos.Eliminar' ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
        ref: 'productosprincipal',
        selector: 'productosprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'productosingresar',
        selector: 'productosingresar'
    },{
    
        ref: 'busquedaproductos',
        selector: 'busquedaproductos'
    },{
    
        ref: 'productosdesplegar',
        selector: 'productosdesplegar'
    },{
    
        ref: 'facturasingresar',
        selector: 'facturasingresar'
    },{
        ref: 'detalleexistenciasproductos',
        selector: 'detalleexistenciasproductos'
    },{
        ref: 'eliminarproductos',
        selector: 'eliminarproductos'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'productosprincipal button[action=buscarproductos]': {
                click: this.buscarproductos
            },            
            'productosprincipal button[action=exportarexcelproductos]': {
                click: this.exportarexcelproductos
            },
            'productosprincipal button[action=filtroProductos]': {
                click: this.filtroProductos
            },
            'productosingresar button[action=grabarproductos]': {
                click: this.grabarproductos
            },
            'productosdesplegar button[action=grabarproductos2]': {
                click: this.grabarproductos2
            },
            'productosprincipal button[action=agregarproductos]': {
                click: this.agregarproductos
            },
            'productosprincipal button[action=editarproductos]': {
                click: this.editarproductos
            },
            'productosprincipal button[action=cerrarproductos]': {
                click: this.cerrarproductos
            },
            'facturasingresar #productoId': {
                select: this.selectItem
            },
            'facturasingresar #buscarproductos': {
                select: this.selectCodigo
            },
            'facturasingresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'facturasingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
             'facturasingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'detalleexistenciasproductos button[action=exportarexcelexistenciadetalleproducto]': {
                click: this.exportarexcelexistenciadetalleproducto
            },
            'productosprincipal button[action=detalleexistenciasproductos]': {
                click: this.detalleexistenciasproductos
            },
            'eliminarproductos button[action=salirproductos]': {
                click: this.salirproductos
            },
            'eliminarproductos button[action=eliminar]': {
                click: this.eliminar
            },
            'productosprincipal button[action=eliminarprod]': {
                click: this.eliminarprod
            }
        });
    },

    editarproductos2: function(){

        Ext.Ajax.request({
            url: preurl + 'productos/actualiza',
            params: {

                id: 1
                
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Corregidos Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load();
                    Ext.Msg.alert('Datos No Corregidos Producto con Movimientos');
                    return;
                     
                 };
        }
        });

        
    },

    eliminarprod: function(){

        var view = this.getProductosprincipal()
       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit =   Ext.create('Infosys_web.view.productos.Eliminar').show();
            edit.down('#idproductoID').setValue(row.data.id);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
    },

    salirproductos: function(){

       var view = this.getEliminarproductos();
       view.close();

    },

    eliminar: function(){

        var view = this.getEliminarproductos();
        var idproducto = view.down('#idproductoID').getValue();
        var st = this.getProductosStore();


        Ext.Ajax.request({
            url: preurl + 'productos/elimina',
            params: {

                idproducto: idproducto
                
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Eliminados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load();
                    Ext.Msg.alert('Datos No Eliminados Producto con Movimientos');
                    return;
                     
                 };
        }
        });

        view.close();
        st.load();            
    },

     detalleexistenciasproductos : function(){

        var view = this.getProductosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.productos.detalle_existenciasproductos').show();
            var nombre = (row.get('id'));
            var stock = (row.get('stock'));
            edit.down('#productoId').setValue(nombre);
            edit.down('#stockId').setValue(stock);
            var st = this.getExistencias2Store()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

     exportarexcelexistenciadetalleproducto : function(){

        var view =this.getDetalleexistenciasproductos()
        var idproducto = view.down('#productoId').getValue()
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getDetalleexistenciasproductos()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelExistenciadetalle?idproducto='+idproducto+'&cols='+Ext.JSON.encode(jsonCol));
        view.close();

   },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){

        var view = this.getFacturasingresar();
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        
        stItem.each(function(r){
            pretotal = pretotal + (parseInt(r.data.total))
            //iva = iva + r.data.iva
            //neto = neto + r.data.neto
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(dcto, '0'));
          
    },

    eliminaritem: function() {
        var view = this.getFacturasingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        this.recalcularFinal();
    },

    agregarItem: function() {

        var view = this.getFacturasingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioprom  = ((view.down('#preciopromId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/ 1.19);
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;
        
        if (descuento == 1){            
            var descuento = 0;
            var iddescuento = 0;
        };

        if (descuento > 0){            
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
        };

        if (tipo_documento.getValue() == 2){

             var neto = (Math.round(cantidad * precio) - descuento);
             var iva = 0;
             var total = neto;

        }else{
        
        var neto = ((cantidad * precio));
        var tot = (Math.round(neto * 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = ((neto + iva ));        

        };
                
        if(!producto){
            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;

        }

        if(precio==0){

            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
            

        }

        if(cantidad>cantidadori){

            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
            

        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }

        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
           
        }

        stItem.each(function(r){
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#descuentoId').setValue(cero);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            id_descuento: iddescuento,
            nombre: nombre,
            precio: precio,
            p_promedio: precioprom,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva,
            dcto: descuento
        }));
        this.recalcularFinal();

        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#totdescuentoId').setValue(cero1);
        view.down('#DescuentoproId').setValue(cero);
        view.down("#buscarproc").focus();
    },

    selectItem: function() {
        var view = this.getFacturasingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    selectCodigo: function() {

        var view = this.getFacturasingresar();
        var producto = view.down('#codigoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
    },

    exportarexcelproductos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProductosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelProductos?cols='+Ext.JSON.encode(jsonCol));
 
    },

    buscarproductos: function(){
        
        var view = this.getProductosprincipal();
        var st = this.getProductosStore();
        var cero ="";
        var nombre = view.down('#nombreId').getValue();
        
        var familia = view.down('#tipofamiliaId').getValue();
        
        var agrupacion = view.down('#tipoagrupacionId').getValue();
        
        var subfamilia = view.down('#tiposubfamiliaId').getValue();
        
        var opcion = view.down('#tipoSeleccionId').getValue();
                
        st.proxy.extraParams = {nombre : nombre, 
                                familia : familia, 
                                agrupacion : agrupacion,
                                subfamilia : subfamilia,
                                opcion : opcion}
        var tipo = "Nombre";
        view.down('#nombreId').setValue(cero);
        view.down('#tipofamiliaId').setValue(cero);
        view.down('#tipoagrupacionId').setValue(cero);
        view.down('#tiposubfamiliaId').setValue(cero);
        view.down('#tipoSeleccionId').setValue(tipo);
        view.down("#nombreId").focus();
        var tipo = "Nombre";

        st.load();

    },

    facturarproductos: function(){
        
        var view = this.getFacturasingresar()
        var st = this.getProductosStore()
        var codigo = view.down('#codigoId').getValue()
             
        st.proxy.extraParams = {codigo : codigo 
                                }
        st.load();
    },

    
    grabarproductos: function(){

        var win    = this.getProductosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getProductosStore();
        
        form.getForm().submit({
            url: preurl + 'productos/save',
            success: function(){
                st.load();
                win.close();
            }

        });

    },

    grabarproductos2: function(){

        var win    = this.getProductosdesplegar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }

        var st = this.getProductosStore();

        form.getForm().submit({
          
            url: preurl + 'productos/update',
            success: function(){
                st.load();
                win.close();
            }

        });
    },

   

        
    editarproductos: function(){

          
        var view = this.getProductosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.productos.Desplegar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarproductos: function(){
        Ext.create('Infosys_web.view.productos.Ingresar').show();
    },

    cerrarproductos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










