Ext.define('Infosys_web.controller.Cambios', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Cambios',
             'Cambios.Items',
             'Clientes',
             'Factura2',
             'Notacreditop',
             'Productosf'],

    models: ['Cambios',
             'Cambios.Item'],

    views: ['Cambios.Principal',
             'Cambios.Ingresar',
             'Cambios.BuscarClientes',
             'Cambios.BuscarFacturas',
             'Cambios.BuscarProductos',
             'Cambios.BuscarProductos2'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'cambiosprincipal',
        selector: 'cambiosprincipal'
    },{
        ref: 'cambiosinventario',
        selector: 'cambiosinventario'
    },{
        ref: 'buscarclientescambios',
        selector: 'buscarclientescambios'
    },{
        ref: 'buscarfacturascambio',
        selector: 'buscarfacturascambio'
    },{
        ref: 'buscarproductoscambio',
        selector: 'buscarproductoscambio'
    },{
        ref: 'buscarproductoscambio2',
        selector: 'buscarproductoscambio2'
    }



    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mcambios]': {
                click: this.mcambios
            },
            'cambiosprincipal button[action=agregarcambios]': {
                click: this.agregarcambios
            },
            'cambiosprincipal button[action=cerrarcambios]': {
                click: this.cerrarcambios
            },
            'cambiosprincipal button[action=exportarexcelcambios]': {
                click: this.exportarexcelcambios
            },
            'cambiosprincipal button[action=editarcambios]': {
                click: this.editarcambios
            },
            'cambiosprincipal button[action=buscarcambios]': {
                click: this.buscarcambios
            },
            'cambiosinventario button[action=validarut]': {
                click: this.validarut
            },
            'buscarclientescambios button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarclientescambios button[action=buscarcambiosclientes]': {
                click: this.buscarcambiosclientes
            },
            'cambiosinventario button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'buscarfacturascambio button[action=buscarfac]': {
                click: this.buscarfac
            },
            'buscarfacturascambio button[action=seleccionarfactura]': {
                click: this.seleccionarfactura
            },
            'cambiosinventario button[action=buscarproductosfacturas]': {
                click: this.buscarproductosfacturas
            },
            'buscarproductoscambio button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductoscambio2 button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'cambiosinventario button[action=buscarproductosdevolucion]': {
                click: this.buscarproductosdevolucion
            },
            'buscarproductoscambio2 button[action=buscarproductosf]': {
                click: this.buscarp
            },
            'cambiosinventario button[action=agregarItem]': {
                click: this.agregarItem
            },
            'cambiosinventario button[action=grabarCambios]': {
                click: this.grabarCambios
            },
            'cambiosinventario #cantidadId': {
                specialkey: this.calculacambio
            },
           
        });
    },

    calculacambio: function(){
        var view = this.getCambiosinventario();
        var cantidad = view.down('#cantidadId').getValue();
        var precio = view.down('#precioId').getValue();
        var total = (cantidad * precio);
        view.down('#totdevId').setValue(total);
        
    },

    grabarCambios: function(){

        var view = this.getCambiosinventario();
        var idcliente = view.down('#id_cliente').getValue();
        var stItem = this.getCambiosItemsStore();
        var idfactura = view.down('#facturaId').getValue();
        var numdevol = view.down('#numero_id').getValue();
        var vendedor = view.down('#tipoVendedorId').getValue();
        var vendedor = view.down('#tipoVendedorId').getValue();
        var fechaid = view.down('#fechaid').getValue();
        var fechacom = view.down('#fechafactid').getValue();
        var idbodega = view.down('#tipobodegaId').getValue();
        var st = this.getCambiosStore(); 
       
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });


        Ext.Ajax.request({
            url: preurl + 'cambios/save',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                numerodev : numdevol,
                fechadev : Ext.Date.format(fechaid,'Y-m-d'),
                fechacom : Ext.Date.format(fechacom,'Y-m-d'),
                idfactura: idfactura,
                idbodega: idbodega
            },
             success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idcambio= resp.idcambio;
                 view.close();
                 stCambio.load();
                 window.open(preurl + 'preventa/exportPDF/?idcambio='+idpcambio);
            }
           
        });

    },

    agregarItem: function() {

        var view = this.getCambiosinventario();
        var idcliente = view.down('#id_cliente').getValue();
        var stItem = this.getCambiosItemsStore();
        var idfactura = view.down('#facturaId').getValue();
        var numdevol = view.down('#numero_id').getValue();
        var secuencia = secuencia + 1;
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var cantidadoridev = view.down('#cantidadOriginaldevId').getValue();

        var totalorig = view.down('#totdevId').getValue();

        var cantidad = view.down('#cantidadId').getValue();
        var cantidaddev = view.down('#cantidaddevId').getValue();

        var idproducto = view.down('#productoId').getValue();
        var idproductodev = view.down('#productodevId').getValue();

        var nomentrada = view.down('#nombreproductoId').getValue();
        var nomentradadev = view.down('#nombreproductodevId').getValue();

        var precio = view.down('#precioId').getValue();
        var preciodev = view.down('#preciodevId').getValue();

        var totaldevul= (preciodev * cantidaddev);

        var tipocambio = view.down('#tipoCambioId').getValue();

        if (tipocambio==1){
            
            if (totaldevul != totalorig ){

                Ext.Msg.alert('Alerta', 'Valores No Coinciden Con devolucion');
                return; 
                

            }
        };

        if (secuencia > 21){

           Ext.Msg.alert('Alerta', 'Ya sobrepaso el maximo de Registros');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#preciodevId').setValue(cero);
                view.down('#codigodevId').setValue(cero);
                view.down('#productodevId').setValue(cero);
                view.down('#nombreproductodevId').setValue(cero);
                view.down('#cantidaddevId').setValue(cero);
                view.down('#cantidadOriginaldevId').setValue(cero);
                view.down('#precioId').setValue(cero);
                return; 
            

        };
         
        if(!idproducto){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;
        }

       
        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera Lo Vendido');
            return false;
        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        } 
        
        if(idcliente==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cliente.');
            return false;
        }       
               
        stItem.add(new Infosys_web.model.Cambios.Item({
            id: secuencia,
            id_entrada: idproducto,
            nom_entrada: nomentrada,
            can_entrada: cantidad,
            id_salida: idproductodev,
            nom_salida: nomentradadev,
            can_salida: cantidaddev,
            val_entrada: precio,
            val_salida: preciodev,
            id_factura: idfactura
        }));
        
        cero="";
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#preciodevId').setValue(cero);
        view.down('#codigodevId').setValue(cero);
        view.down('#productodevId').setValue(cero);
        view.down('#nombreproductodevId').setValue(cero);
        view.down('#cantidaddevId').setValue(cero);
        view.down('#cantidadOriginaldevId').setValue(cero);
        view.down('#precioId').setValue(cero);
    },

    buscarp: function(){
        var view = this.getBuscarproductoscambio2();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    seleccionarproductos2: function(){

        var view = this.getBuscarproductoscambio2();
        var viewIngresa = this.getCambiosinventario();
        var cantidaddev = viewIngresa.down('#cantidadId').getValue()
        var idproducto = viewIngresa.down('#productoId').getValue()
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var nomproducto = (row.data.nombre);
            var pventa = (row.data.p_venta);
            var codigo = (row.data.codigo);
            if(idproducto==row.data.id){
                Ext.Msg.alert('Alerta', 'Producto debe ser Diferente');
                return;                
            }else{
            viewIngresa.down('#cantidadOriginaldevId').setValue(cantidaddev);
            viewIngresa.down('#cantidaddevId').setValue(cantidaddev);
            viewIngresa.down('#productodevId').setValue(row.data.id);
            viewIngresa.down('#nombreproductodevId').setValue(nomproducto);
            viewIngresa.down('#codigodevId').setValue(row.data.codigo);
            viewIngresa.down('#preciodevId').setValue(pventa);
            view.close();
            };
                    

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

     buscarproductosdevolucion: function(){
        
        var viewIngresa = this.getCambiosinventario();
        var codigo = viewIngresa.down('#codigodevId').getValue()
        var cantidaddev = viewIngresa.down('#cantidadId').getValue()
        if (!codigo){
            var st = this.getProductosfStore();
            Ext.create('Infosys_web.view.Cambios.BuscarProductos2').show();
            st.load();
        }else{

            Ext.Ajax.request({
            url: preurl + 'productos/buscacodigo?codigo='+codigo,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true){                    
                    if(resp.cliente){
                        var cliente = resp.cliente;                        
                        viewIngresa.down('#productodevId').setValue(cliente.id);
                        viewIngresa.down('#nombreproductodevId').setValue(cliente.nombre);
                        viewIngresa.down('#codigodevId').setValue(cliente.codigo);
                        viewIngresa.down('#preciodevId').setValue(cliente.p_venta);
                        viewIngresa.down('#cantidadOriginaldevId').setValue(cantidaddev);
                        viewIngresa.down('#cantidaddevId').setValue(cantidaddev);
                                                                     
                    }
                    
                }

              
            }

        });           

        }
    },

    buscarproductosfacturas : function(){

        var view = this.getCambiosinventario();
        var st = this.getNotacreditopStore()
        var nombre = view.down('#facturaId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
        Ext.create('Infosys_web.view.Cambios.BuscarProductos2').show();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductoscambio();
        var viewIngresa = this.getCambiosinventario();
        //var idfactura = viewIngresa.down('#factId').getValue();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            var idproducto = (row.data.id_producto);
            var nomproducto = (row.data.nombre);
            var idfactura = (row.data.id_factura);
            var pventa = (row.data.p_venta);

            Ext.Ajax.request({
                    url: preurl + 'notacredito/validaproducto',
                params: {
                    idproducto: idproducto,
                    idfactura : idfactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);                

                   if(resp.cliente){
                      var cliente = resp.cliente;
                      var canti = cliente.cantidad;
                      viewIngresa.down('#cantidadOriginalId').setValue(canti);
                      viewIngresa.down('#productoId').setValue(idproducto);
                      viewIngresa.down('#nombreproductoId').setValue(nomproducto);
                      viewIngresa.down('#codigoId').setValue(row.data.codigo);
                      viewIngresa.down('#precioId').setValue(pventa);
                      view.close();
                    }

                   if (resp.success == false) {

                    cero="";
                    cero2=0;
                    viewIngresa.down('#codigoId').setValue(cero);
                    viewIngresa.down('#productoId').setValue(cero);
                    viewIngresa.down('#nombreproductoId').setValue(cero);
                    viewIngresa.down('#cantidadId').setValue(cero2);
                    viewIngresa.down('#precioId').setValue(cero2);
                    viewIngresa.down('#cantidadOriginalId').setValue(cero);
                    viewIngresa.down("#buscarproc").focus();

                    Ext.Msg.alert('Alerta', 'Producto No corresponde a Factura');
                    return false;
                    

                   }
                               
                    }
                });
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscarproductosfacturas : function(){

        var view = this.getCambiosinventario();
        var st = this.getNotacreditopStore()
        var nombre = view.down('#facturaId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
        Ext.create('Infosys_web.view.Cambios.BuscarProductos').show();
    },

    seleccionarfactura: function(){

        var view = this.getBuscarfacturascambio();
        var viewIngresa = this.getCambiosinventario();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#facturaId').setValue(row.data.id);
            viewIngresa.down('#numfactId').setValue(row.data.num_factura);
            viewIngresa.down('#totalfactId').setValue(row.data.totalfactura);
            viewIngresa.down('#fechafactid').setValue(row.data.fecha_factura);            
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }        

    },

    buscarfac: function(){
        
        var view = this.getBuscarfacturascambio();
        var st = this.getFactura2Store()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Numero"}
        st.load();
    },

    buscarfactura : function() {

       var busca = this.getCambiosinventario()
       var nombre = busca.down('#id_cliente').getValue();
    
       if (nombre){
          var edit =  Ext.create('Infosys_web.view.Cambios.BuscarFacturas').show();
          var st = this.getFactura2Store();
          st.proxy.extraParams = {nombre : nombre,
                                  opcion : "Cliente"};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },


    buscarcambiosclientes: function(){

        var view = this.getBuscarclientescambios()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientescambios();
        var viewIngresa = this.getCambiosinventario();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }       
    },

    validarut: function(){

        var view =this.getCambiosinventario();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero==0){
            var edit = Ext.create('Infosys_web.view.Cambios.BuscarClientes');            
                  
        }else{
       
         if(numero>9){            
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;            
        }else{
            if(numero>13){
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;   
            }
        }

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true){                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#rutId").setValue(rut) 
                                             
                    }else{
                         Ext.Msg.alert('Rut No Exite');
                         view.down("#rutId").setValue(cero); 
                        return;   
                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      view.down("#rutId").setValue(cero);
                      return;
                      
                }              
            }

        });       
        }
    },

    agregarcambios: function(){

        var nombre = "23";
        var tipo = "1";
        var cambio = 1;

         Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.Cambios.Ingresar').show();                  
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numero_id").setValue(correlanue);
                    view.down("#tipobodegaId").setValue(tipo);
                    view.down("#tipoCambioId").setValue(cambio);
                    view.down("#rutId").focus();
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });        
       

       
        

    },

    editarcambios: function(){

        
    },


    cerrarcambios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mcambios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cambiosprincipal'});
    },

   
    exportarexcelcambios: function(){

        

    },

    buscarcambios: function(){

        var view = this.getCambiosprincipal()
        var st = this.getCambiosStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
    },

    
  
});










