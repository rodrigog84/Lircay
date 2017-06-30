Ext.define('Infosys_web.controller.Ventadirecta', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Venta',
             'Tipo_documento',
             'Cond_pago',
             'Preventa_detalle',
             'recaudacion.Items',
             'Factura5',
             'Productosf',
             'Clientes',
             'Preventa',
             'Sucursales_clientes',
             'Boleta',
             'productos.Items'
             ],

    models: ['Venta.Item',
              'Cond_pag',
              'Preventa_detalle',
              'Recaudacion',
              'Recaudacion_detalle',
              'recaudacion.Item',
              'Factura',
              'Boletas',
              'Producto'],

    views: ['Pago_caja.Genera_pago',
            'Pago_caja.Principal',
            'Pago_caja.Facturas',
            'Pago_caja.Apertura',
            'Pago_caja.BuscarSucursales',
            'Preventa.BuscarProductos3',
            'Preventa.BuscarClientes3',
            'Preventa.Pagocheque'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'pagocajaprincipal',
        selector: 'pagocajaprincipal'
    },{    
        ref: 'generapagoingresar',
        selector: 'generapagoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'documentosingresar',
        selector: 'documentosingresar'
    },{    
        ref: 'aperturacaja',
        selector: 'aperturacaja'
    },{    
        ref: 'buscarsucursalesfactura',
        selector: 'buscarsucursalesfactura'
    },{    
        ref: 'observacionesfacturas',
        selector: 'observacionesfacturas'
    },{    
        ref: 'buscarclientesboleta2',
        selector: 'buscarclientesboleta2'    
    },{    
        ref: 'buscarproductospreventa3',
        selector: 'buscarproductospreventa3'
    },{    
        ref: 'generapagocheque',
        selector: 'generapagocheque'
    }

    ],
    
    init: function() {
    	
        this.control({

            'documentosingresar #condpagoId': {
                select: this.selectcondpago
            },
            'documentosingresar #valorcancelaId': {
                specialkey: this.special,
                blur: this.selectItemcancela,
            },
            'documentosingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'documentosingresar button[action=grabarboleta]': {
                click: this.grabarboleta
            },
            'documentosingresar #cantidadId': {
                specialkey: this.special8
            },
            'documentosingresar button[action=validarut]': {
                click: this.validarut
            },
            'documentosingresar #rutId': {
                specialkey: this.special6
            },
            'documentosingresar #DescuentoproId': {
                change: this.changedctofinal3
            },
            'documentosingresar #tipoDocumento2Id': {
                select: this.selectItemdocuemento,
            },
            'buscarclientesboleta2 button[action=buscar]': {
                click: this.buscar
            },
            'buscarclientesboleta2 button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'documentosingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductospreventa3 button[action=buscar]': {
                click: this.buscarp
            },
            'buscarproductospreventa3 button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'documentosingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'generapagocheque button[action=agregarrecaudacion]': {
                click: this.agregarrecaudacion
            },
            'generapagocheque button[action=aceptacheques]': {
                click: this.aceptacheques
            },
            'generapagocheque button[action=eliminaritem]': {
                click: this.eliminaritem2
            },
            'topmenus menuitem[action=mpagocaja]': {
                click: this.mpagocaja
            },
        });
    },

    eliminaritem2: function() {
        var view = this.getGenerapagocheque();
        var grid  = view.down('#recaudacionId');
        var valortotal = view.down('#valorpagoId').getValue();
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            console.log(row.data.valor_cancelado);
            var valortotal = valortotal + row.data.valor_cancelado;
            view.down('#valorpagoId').setValue(valortotal);
            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }   
    },

    aceptacheques: function(){

        var view = this.getGenerapagocheque();
        var viewIngresa = this.getDocumentosingresar();
        var valida = view.down('#validapagoId').getValue();
        var cero=0;
        var fpago=1;
        if (valida == "SI"){
        var valorcheque = view.down('#valorpagoId').getValue();        
        var valortotal = viewIngresa.down('#finaltotalpostId').getValue();
        var vtotal = valorcheque;
        if (valorcheque == 0){
            viewIngresa.down('#valorcancelaId').setValue(valortotal);
            
        }else{
            viewIngresa.down('#finaltotalId').setValue(valorcheque);
            viewIngresa.down('#finaltotalpId').setValue(vtotal);
            viewIngresa.down('#condpagoId').setValue(fpago);            
        };
        view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos de Cheque');
            return;
            
        }
        
    },

    agregarrecaudacion: function() {

        var view = this.getGenerapagocheque();
        var viewIngresa = this.getDocumentosingresar();
        var stItem = this.getRecaudacionItemsStore();
        var formapago = 2;
        var numcheque = view.down('#numchequeId').getValue();
        var fechacheque = view.down('#fechacheqId').getValue();
        var valortotal = view.down('#valorpagoId').getValue(); 
        var valorpago = view.down('#valorchequeId').getValue();
        var valorvalida = valortotal - valorpago;
        var numdoc = view.down('#numfacturaId').getValue();
        var nompago = view.down('#condpagoId').getValue();
        var banco = view.down('#bancoId').getValue();
        var id_banco = view.down('#bancoId').getValue();
        if (!banco){
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
            return;
        };
        var banco = view.down('#bancoId');
        var stCombo = banco.getStore();
        var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
        var nombrebanco = nombrebanco.nombre;
        //var id_banco = nombrebanco.id;
        var valida = "SI";
        var cero = "";
        
              
        if (valorpago==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Monto Cheque Banco');
            return;
        };        
        if (numcheque==0) {
            Ext.Msg.alert('Alerta', 'Debe Ingresar Numero de Cheque');
            return;
        };  
        if (!numcheque){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Numero de Cheque');
            return;
        };
        if (!valorpago){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Monto Cheque Banco');
            return;
        };
       
        var exists = 0;        
        stItem.each(function(r){
        if (r.data.nom_forma == "PAGO CHEQUE "){
            if(r.data.num_cheque == numcheque ){
                Ext.Msg.alert('Alerta', 'El Cheque ya existe.');
                exists = 1;
                return; 
            }
        }           
        });

        if(exists == 1)
            return;

        stItem.add(new Infosys_web.model.recaudacion.Item({
            id_pago: formapago,
            detalle: nombrebanco,
            nom_forma: nompago,
            num_doc : numdoc,            
            id_forma: formapago,
            num_cheque: numcheque,
            fecha_comp: fechacheque,
            nom_banco: nombrebanco,
            id_banco: id_banco,
            valor_pago: valorpago,
            valor_cancelado: valorpago,
           
        }));

       
        view.down('#valorpagoId').setValue(valorvalida);
        view.down('#valorchequeId').setValue(cero);
        view.down('#numchequeId').setValue(cero);
        view.down('#bancoId').setValue(cero);
        view.down('#validapagoId').setValue(valida);  
        viewIngresa.down('#validapagoId').setValue(valida);        
        
    },

   
    selectItemdocuemento: function() {
        
        var view =this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumento2Id');
        var tipo = tipo_documento.getValue();
        var cero="";
        var nombre="19";
        
        if(tipo == 101){  // limpiar campos
            view.down('#rutId').setValue(cero);
            view.down('#id_cliente').setValue(cero);
            view.down('#nombre_id').setValue(cero);
            view.down('#tipocondpagoId').setValue(cero);
            view.down('#direccionId').setValue(cero);
            view.down('#giroId').setValue(cero);  
            view.down('#tipoVendedorId').setValue(cero);
            view.down("#rutId").focus();         
                
        };

        if(tipo == 105){  // limpiar campos
            view.down('#rutId').setValue(cero);
            view.down('#id_cliente').setValue(cero);
            view.down('#nombre_id').setValue(cero);
            view.down('#tipocondpagoId').setValue(cero);
            view.down('#direccionId').setValue(cero);
            view.down('#giroId').setValue(cero);  
            view.down('#tipoVendedorId').setValue(cero);           
            view.down("#codigoId").focus();     
        };

        if(tipo == 2){  // limpiar campos
            Ext.Ajax.request({
                url: preurl + 'correlativos/buscaboletarut?valida='+nombre,
                params: {
                    id: 1
                },
                success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var detalle = resp.detalle;
                if (resp.success == true) {
                    view.down('#rutId').setValue(detalle.rut);
                    view.down('#id_cliente').setValue(detalle.id);
                    view.down('#nombre_id').setValue(detalle.nombres);
                    view.down('#tipocondpagoId').setValue(detalle.id_pago);
                    view.down('#direccionId').setValue(detalle.direccion);
                    view.down('#giroId').setValue(detalle.id_giro);  
                    view.down('#tipoVendedorId').setValue(detalle.id_vendedor);           
                    view.down("#codigoId").focus(); 

                 }
                 }            
                });  
                    
        };         
       
        view.down("#rutId").focus();       

     },

    agregarpedidocaja: function(){

         var viewIngresa = this.getPagocajaprincipal();
         var idbodega = "1";
         var dos = "2";
         var rut = "19";
         var idCliente = 1;
         var pedido = "3";
         var pago = "1";
         if(!idbodega){
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega');
            return;    
         }else{
         var nombre = "20";    
         Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.pedidos_caja.Pedidos').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#ticketId").setValue(correlanue);
                    view.down("#bodegaId").setValue(idbodega);
                    view.down("#tipoDocumentoId").setValue(dos);
                    view.down("#rutId").setValue(rut);
                    view.down("#id_cliente").setValue(idCliente);
                    view.down("#tipoPedidoId").setValue(pedido);
                    view.down("#tipocondpagoId").setValue(pago);
                    view.down("#nombre_id").focus();
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }
            }            
        });
        
        };        
       
    },

    special8: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.agregarItem()
        }
    },


    specialBoleta: function(f,e){    
       this.buscarproductos();
    },

    

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){

        var view = this.getDocumentosingresar();
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        
        stItem.each(function(r){
            pretotal = pretotal + ((r.data.total))
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
        view.down('#finaltotalpId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
         
    },

    agregarItem3: function() {

        var view = this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var numdoc = view.down('#numboletaId').getValue();
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        var tipopago = 1;
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;

        var tot = ((cantidad * precio) - descuento);
        var neto = (Math.round(tot * 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = (neto + iva );
        
        stItem.each(function(r){
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                uno=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(uno);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            id_descuento: iddescuento,
            id_bodega: idbodega,
            nombre: nombre,
            precio: precio,
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
        view.down('#condpagoId').setValue(tipopago);
        view.down('#numboleta2Id').setValue(numdoc);
        view.down("#codigoId").focus();
    },

    lectura: function(){

        var viewIngresa = this.getDocumentosingresar();
        var codigo = viewIngresa.down('#codigoId').getValue()
        var rut = viewIngresa.down('#rutId').getValue();
        var valida = "";
        if(!rut){
             Ext.Msg.alert('Alerta', 'Debe Seleccionar Cliente');
            return;  
            
        }
        var lista = 1;
        var idbodega = 1;
                  
        if (!codigo){
            var st = this.getProductosfStore()
            st.proxy.extraParams = {idlista: lista,
                                    idbodega: idbodega}
            st.load();
            var view = Ext.create('Infosys_web.view.Pago_caja.BuscarProductos').show();
            view.down('#listaId').setValue(lista);
            view.down('#bodegaId').setValue(idbodega);
            view.down("#codigoId").focus();  
        }else{

            Ext.Ajax.request({
            url: preurl + 'productosfact/buscacodigoboleta',
            params: {
                id: 1,
                codigo : codigo,
                idlista : lista
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true){                    
                    if(resp.cliente){
                        var cliente = resp.cliente;                        
                        viewIngresa.down('#productoId').setValue(cliente.id_producto);
                        viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                        viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                        viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                        viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                        viewIngresa.down("#cantidadId").focus();                                             
                    }                    
                };              
                                          
                if(resp.success == false){                
                  if (resp.cliente){
                        var cliente = resp.cliente;                        
                        viewIngresa.down('#productoId').setValue(cliente.id_producto);
                        viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                        viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                        viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                        viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                        viewIngresa.down("#cantidadId").setValue(cliente.cantidad);
                        viewIngresa.down("#agregarId").focus();
                        //this.agregarItem();

                  }else{
                       Ext.Msg.alert('Alerta', 'Producto no existe');
                        return;
                };          
              };
          }

        });
        };
        //this.agregarItem3();
        
    },

    agregarItem: function() {

        var view = this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var numdoc = 0;
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        if(!idbodega){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Bodega');
            return false;
        }
        var tipopago = 1;
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;

        if(!cantidad){            
            Ext.Msg.alert('Alerta', 'Debe Agregar Cantidad');
            return false;
        }
        
        var neto = ((cantidad * precio) - descuento);
        var tot = (Math.round(neto * 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = (neto + iva );
        
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
                uno=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(uno);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            id_descuento: iddescuento,
            id_bodega: idbodega,
            nombre: nombre,
            precio: precio,
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
        view.down('#condpagoId').setValue(tipopago);
        view.down("#codigoId").focus();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductospreventa3();
        var viewIngresa = this.getDocumentosingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            viewIngresa.down("#cantidadId").focus();
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        //this.buscarproductos();
       
    },

    buscarbarra: function(){

        var viewIngresa = this.getDocumentosingresar();
        var codigo = viewIngresa.down('#codigoId').getValue()
        var rut = viewIngresa.down('#rutId').getValue();
        var valida = "";
        if(!rut){
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Cliente');
            return;  
            
        }
        if(codigo){        
        var lista = 1;
        var idbodega = 1;
                  
        Ext.Ajax.request({
        url: preurl + 'productosfact/buscacodigoboleta',
        params: {
            id: 1,
            codigo : codigo,
            idlista : lista
        },
        success: function(response){
            var resp = Ext.JSON.decode(response.responseText);
            var cero = "";
            if (resp.success == true){                    
                if(resp.cliente){
                var cliente = resp.cliente;                        
                viewIngresa.down('#productoId').setValue(cliente.id_producto);
                viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                viewIngresa.down("#cantidadId").focus();                                             
                }                    
            };              
                                      
            if(resp.success == false){                
              if (resp.cliente){
                    var cliente = resp.cliente;                        
                    viewIngresa.down('#productoId').setValue(cliente.id_producto);
                    viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                    viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                    viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                    viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                    viewIngresa.down("#cantidadId").setValue(cliente.cantidad);
                    viewIngresa.down("#agregarId").focus();
                    //this.agregarItem();

              }else{
                   Ext.Msg.alert('Alerta', 'Producto no existe');
                    return;
            };          
          };
          }
        });
        };

        //this.agregarItem3();

    },

    buscarproductos: function(){

        var busca = this.getDocumentosingresar()
        var idbodega = busca.down('#bodegaId').getValue();
        var st = this.getProductosfStore();
        st.proxy.extraParams = {opcion : idbodega};
        st.load();
        var edit = Ext.create('Infosys_web.view.Preventa.BuscarProductos3').show();
        edit.down('#bodegaId').setValue(idbodega);
        
    },

    buscarp: function(){
        var view = this.getBuscarproductospreventa3();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue();
        var lista = 1;
        var idbodega = view.down('#bodegaId').getValue();                

        st.proxy.extraParams = {nombre : nombre,
                                idlista: lista,
                                idbodega: idbodega}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientesboleta2();
        var viewIngresa = this.getDocumentosingresar();
        var viewedit = this.getPagocajaprincipal();
        var idcaja = 1;
        var idcajero = 1;        
        var lista = 1;
        var bodega = 1;
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#giroId').setValue(row.data.id_giro);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);          
            view.close();
            viewIngresa.down("#codigoId").focus();   
       
                 
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },    


    buscar: function(){

        var view = this.getBuscarclientesboleta2()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue();
        var rut = view.down('#rutId').getValue();
        if(nombre){
            var opcion="Nombre";
        };
        if(rut){
            var opcion="Rut";
            var nombre=rut;
        };
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    changedctofinal3: function(){
        this.recalculardescuentopro();
    },

    recalculardescuentopro: function(){

        var view = this.getDocumentosingresar();
        var precio = view.down('#precioId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var total = ((precio * cantidad));
        var desc = view.down('#DescuentoproId').getValue();       
        if (desc){
        var descuento = view.down('#DescuentoproId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
        totaldescuento = (((total * dcto)  / 100));
        view.down('#totdescuentoId').setValue(totaldescuento);
        };         
    },

   
   validarut: function(){

        var viewedit = this.getPagocajaprincipal();
        var view = this.getDocumentosingresar();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        var lista = 1;
        var idbodega = 1;
        var idcajero = 1;
        var idcaja = 1;
        
        if (!rut){
            
           var edit = Ext.create('Infosys_web.view.Preventa.BuscarClientes3');            
           
        };

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {                    
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#rutId").setValue(rut);
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.id_giro)
                        view.down("#direccionId").setValue(cliente.direccion)    
                        view.down("#rutId").setValue(rut)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)                        
                        //view.down("#buscarproc").focus()  
            
                    }
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      return false
                }

                //view.close()
            }

        });
        
        view.down("#codigoId").focus();   

    },


    observaciones: function(){

        var viewIngresa = this.getFacturasvizualizar();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.Pago_caja.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#FactId").setValue(numfactura);

    },

    special5: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.generaticket()
        }
    },  

    
    aperturacaja: function(){

         var view = this.getAperturacaja();
         var cajero = view.down('#cajeroId').getValue();
         var caja = view.down('#cajaId').getValue();
         var fecha = view.down('#fechaaperturaId').getValue();
       
         if (cajero){

            Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    
                }else{

                     view.down("#efectuvoId").focus();
                }
            }
           
            });            
        };

    },

   
    buscarsucursalfactura: function(){

       var busca = this.getFacturasvizualizar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.Pago_caja.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },
    
    eliminaritem: function() {
        var view = this.getDocumentosingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };
        view.down("#codigoId").focus();

    },

    grabarboleta: function() {

        var viewIngresa = this.getDocumentosingresar();
        var bolEnable = true;
        viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
        var idcajero = viewIngresa.down('#cajeroId').getValue();
        var idcaja = viewIngresa.down('#cajaId').getValue();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var sucursal = viewIngresa.down('#id_sucursalID').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var vender = viewIngresa.down('#tipoVendedorId').getValue();
        var valida = viewIngresa.down('#validapagoId').getValue();
        
        if (valida=="SI"){
            
        }else{
            if (valorapagar>valorpagado){

            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
            Ext.Msg.alert('Valor Pagado Es Menor a Total Boleta');
            return;
        };

        }
        var rtItem = this.getRecaudacionItemsStore();
                
        if(!vender){

            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
            Ext.Msg.alert('Seleccione Vendedor');
            return;   
        }
        var idgiro = viewIngresa.down('#giroId').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var producto = viewIngresa.down('#tipoVendedorId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;        
        var vendedor = record.id;
        var fechapreventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getProductosItemsStore();
        var stPreventa = this.getPreventaStore();
        var observa = viewIngresa.down('#observaId').getValue();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var recauda =  viewIngresa.down('#recaudaId').getValue();

        if(idtipo == 101 || idtipo == 105){


            // se valida que exista certificado
            response_certificado = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/existe_certificado/'});

            var obj_certificado = Ext.decode(response_certificado.responseText);

            if(obj_certificado.existe == true){

                //buscar folio factura electronica
                // se buscan folios pendientes, o ocupados hace más de 4 horas

                response_folio = Ext.Ajax.request({
                async: false,
                url: preurl + 'facturas/folio_documento_electronico/'+idtipo});  
                var obj_folio = Ext.decode(response_folio.responseText);
                //console.log(obj_folio); 
                nuevo_folio = obj_folio.folio;
                if(nuevo_folio != 0){
                    numdoc = nuevo_folio;
                    habilita = true;
                }else{
                    Ext.Msg.alert('Atención','No existen folios disponibles');
                    return;

                    //return
                }

            }else{
                    Ext.Msg.alert('Atención','No se ha cargado certificado');
                    return;
            }

        }else{
            var numdoc = viewIngresa.down('#numboleta2Id').getValue();

        }
        
        var viewedit = this.getPagocajaprincipal();
        var contado =  viewedit.down('#contadoId').getValue();
        var cheques =  viewedit.down('#chequesId').getValue();
        var otros =  viewedit.down('#otrosId').getValue();      
        
        var totaldocumento = viewIngresa.down('#finaltotalpostId').getValue();
        var tdocumento = (viewIngresa.down('#finaltotalpId').getValue());        
        var finalafectoId = (totaldocumento / 1.19);
        var banco = viewIngresa.down('#bancoId').getValue(); 
        var fechapago = viewIngresa.down('#fechachequeId').getValue(); 
        var numcheque = viewIngresa.down('#numchequeId').getValue();
        var bodega = viewIngresa.down('#bodegaId').getValue();
        var formapago = viewIngresa.down('#condpagoId');
        var stCombo = formapago.getStore();
        var record = stCombo.findRecord('id', formapago.getValue()).data;
        var condpago = (record.id);        
        var valorcancela = viewIngresa.down('#valorcancelaId').getValue(); 
        var valorvuelto = viewIngresa.down('#valorvueltoId').getValue();
        if (!valorvuelto){
            valorvuelto=0;
        }

        var valorapagar = parseInt(viewIngresa.down('#finaltotalpostId').getValue());
        var valorpagado = parseInt(viewIngresa.down('#valorcancelaId').getValue());
        
        if (valida=="SI"){

            var valora = parseInt(viewIngresa.down('#finaltotalpostId').getValue());
            var valorb = parseInt(viewIngresa.down('#finaltotalpId').getValue());
            var valortotal = ((valora - valorb));
            var cheques = (cheques) + (valortotal); 
            
        }else{
        
        
        if (!valorcancela){

            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);        
            Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
            return;
        };

        };


               
        if (record.nombre == "CONTADO") {
                   
            var valortotal = ((valorcancela))-((valorvuelto)) ;
            var valort = ((valorcancela))-((valorvuelto)) ;
            var contado = ((contado)) + ((valortotal));
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta al Contado";
            if (valorcancela<tdocumento){

                var bolEnable = false;
                viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
                Ext.Msg.alert('Alerta', 'Valor No puede Ser menor');
                return;
                
            }                

        };

        if (record.nombre == "CREDITO") {
                   
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta al credito";
            var valorvuelto = 0;
            var otros = (otros) + (valorcancela - tdocumento);
            if (valorcancela<tdocumento){

                var bolEnable = false;
                viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
                Ext.Msg.alert('Alerta', 'Valor No puede Ser menor');
                return;
                
            }                   

        };
        
        if (record.nombre == "TARJETA DE DEBITO") {

            
            var otros = (otros) + (valorcancela - tdocumento);
            
            if (valorcancela<tdocumento){

                var bolEnable = false;
                viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
                Ext.Msg.alert('Alerta', 'Valor No puede Ser menor');
                return;
                
            }
           
        };

        if (record.nombre == "TARJETA DE CREDITO") {

            var otros = (otros) + (valorcancela - tdocumento);
            
            if (valorcancela<tdocumento){

                var bolEnable = false;
                viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
                Ext.Msg.alert('Alerta', 'Valor No puede Ser menor');
                return;
                
            }
            
            
        };

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        var recItems = new Array();
        rtItem.each(function(r){
            recItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'recaudacion/save',
            params: {
                fecha : Ext.Date.format(fechapreventa,'Y-m-d'),
                fechapago : Ext.Date.format(fechapago,'Y-m-d'),
                numboleta: numdoc,
                numeroticket: numeroticket,
                tipdocumento: idtipo, 
                numcheque: numcheque,
                recitems: Ext.JSON.encode(recItems),
                items: Ext.JSON.encode(dataItems),                
                id_cliente : idcliente,
                id_caja : idcaja,
                id_cajero : idcajero,
                valorcancela: valorcancela,
                valorvuelto: valorvuelto,
                condpago: condpago,
                banco: banco,
                totaldocumento: totaldocumento,
                tdocumento: tdocumento,
                bodega: bodega,
                idrecauda: recauda,
                contado: contado,
                cheques: cheques,
                otros: otros
            },

            success: function(response){
                var text = response.responseText;
                var resp = Ext.JSON.decode(response.responseText);
                var idboleta= resp.idboleta;
                //viewIngresa.close();
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                //st.load();
                //window.open(preurl + 'facturas/exportPDF/?idfactura='+idboleta);
                var viewedit = this.getPreventaprincipal();             
                viewedit.down('#efectivonId').setValue(contado);
                viewedit.down('#efectivoId').setValue(Ext.util.Format.number(contado, '0,00'));        
                viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
                viewedit.down('#totchequesnId').setValue(cheques);
                viewedit.down('#otrosmontosnId').setValue(otros);
                viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
            }
        });

     
        if(!finalafectoId){
            Ext.Msg.alert('Ingrese Productos a la Venta');
            return;   
        }
      

        if(!idpago){
            Ext.Msg.alert('Ingrese Condicion Venta');
            return;   
        }

        
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'preventa/save',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                sucursal: sucursal,
                observa: observa,
                idtipo : idtipo,
                idpago : idpago,
                idgiro : idgiro,
                idbodega : idbodega,
                numeroticket : numeroticket,
                fechapreventa : fechapreventa,
                descuento : viewIngresa.down('#totdescuentoId').getValue(),
                neto : finalafectoId,
                iva : (totaldocumento - finalafectoId),
                afecto: finalafectoId,
                total: totaldocumento
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idpreventa= resp.idpreventa;
                 viewIngresa.close();
                 stPreventa.load();
                 window.open(preurl + 'preventa/exportPDF/?idpreventa='+idpreventa);
            }
           
        });

        
    //this.generarpago();       
    },
  

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.selectItemcancela()
        }
    },

    selectItemcancela : function() {
        
        var view =this.getDocumentosingresar();
        var valorapagar = parseInt(view.down('#finaltotalpId').getValue());
        var valorpagado = parseInt(view.down('#valorcancelaId').getValue());
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

        console.log(valorapagar)
        console.log("si")
        console.log(valorpagado)
        console.log(valida)
        

        if (valida == "CONTADO") {

        if (valorapagar<valorpagado){
            calculo = (parseInt(valorpagado))-(parseInt(valorapagar));
            view.down('#valorvueltoId').setValue(calculo);
        }

        if (valorapagar==valorpagado){
            calculo = 0;
            view.down('#valorvueltoId').setValue(calculo);
        };

        /*if (valorapagar>valorpagado){

            Ext.Msg.alert('Valor Pagado Es Menor a Total Boleta');
                    return;
        };*/

        }

        if (valida == "CREDITO") {

            calculo = 0;
            view.down('#valorvueltoId').setValue(calculo);
            view.down('#valorcancelaId').setValue(valorapagar);
        }

        
    },

    selectItemcaja : function() {
        
        var view = this.getPagocajaprincipal();
        var tipo_caja = view.down('#cajaId').getValue();
        var stCombo = tipo_caja.getStore();
        var record = stCombo.findRecord('id', tipo_caja.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#comprobanteId').setValue(correlanue);
        this.selectItemdocuemento();        
    },

    exportarexcelpagocaja: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPagocajaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPagocaja?cols='+Ext.JSON.encode(jsonCol));
 
    },

     salir : function() {
        var view =this.getFacturasvizualizar();
        view.close()
     },

     
    selectcondpago: function() {
      
        var view =this.getDocumentosingresar();
        var condpago = view.down('#condpagoId');
        var totdocu = view.down('#finaltotalpostId').getValue();
        var totdoc = view.down('#finaltotalpId').getValue();
        var numdocu = view.down('#numboleta2Id').getValue();        
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;
        var bolDisabled = valida == "CONTADO" ? true : false; // campos se habilitan sólo en factura
        var cero="";
        //view.down('#numchequeId').setDisabled(bolDisabled);
        //view.down('#bancoId').setDisabled(bolDisabled);
        if(!totdocu){   
           view.down('#condpagoId').setValue(cero);
            Ext.Msg.alert('Debe Agregar Valores');
            return;                
        };   

        if (valida == "PAGO CHEQUE "){
            calculo = 0;
            if(totdocu){
            var viewIngresa = Ext.create('Infosys_web.view.Preventa.Pagocheque').show();
            viewIngresa.down('#condpagoId').setValue(valida);
            viewIngresa.down('#valorpagoId').setValue(totdocu);
            viewIngresa.down('#numfacturaId').setValue(numdocu);
            viewIngresa.down("#numchequeId").focus();
            }else{
                view.down('#condpagoId').setValue(cero);
                Ext.Msg.alert('Debe Agregar Valores');
                return;                
            }
        };

        if (valida == "CREDITO") {

            calculo = 0;
            view.down('#valorvueltoId').setDisabled(true);
            view.down('#valorvueltoId').setValue(calculo);
            //view.down('#valorcancelaId').setValue(totdoc);

        };
               
        if (valida == "CONTADO"){

           view.down('#valorvueltoId').setDisabled(false);
           var nombrebanco = "";
           var id_banco = "";
           var numcheque = 0;
           view.down("#numchequeId").setDisabled(true);
           view.down("#bancoId").setDisabled(true);
           view.down("#valorcancelaId").focus();  
        
        };

        if (valida == "TARJETA DE CREDITO"){

           var numcheque = 0;
           view.down("#numchequeId").setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down("#bancoId").setDisabled(false);
           //view.down("#valorcancelaId").setValue(totdocu);                     
           view.down("#numboleta2Id").focus();
        
        };

        if (valida == "TARJETA DE DEBITO"){
           var numcheque = 0;
           view.down("#numchequeId").setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down("#bancoId").setDisabled(false);
           //view.down("#valorcancelaId").setValue(totdocu);           
           view.down("#numboleta2Id").focus();
        
        };

        
    },
    
    mpagocaja: function(){
       
        var cajero = "1";
        var caja = "1";
        var fecha = 0;
                
        Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var view = Ext.create('Infosys_web.view.Pago_caja.Apertura').show();
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    view.down('#cajaId').setValue(caja.id_caja);
                    view.down('#cajeroId').setValue(caja.id_cajero);
                    view.down('#efectuvoId').focus();                 
                    
                }else{

                 var caja1 = "1";
                 var cajero1 = "1";

                 view.down('#efectuvoId').focus();
                 view.down('#cajaId').setValue(caja1);   
                 view.down('#cajeroId').setValue(cajero1);   
                }
            }
           
        });

    },

    
    generarpago: function(){

            var viewedit = this.getPagocajaprincipal();
            var recauda = viewedit.down('#recaudaId').getValue();
            var idcaja = viewedit.down('#cajaId').getValue();
            var nomcaja = viewedit.down('#nomcajaId').getValue();
            var contado = viewedit.down('#efectivonId').getValue();
            var cheques = viewedit.down('#totchequesnId').getValue();
            var otros = viewedit.down('#otrosmontosnId').getValue();
            var idcajero = viewedit.down('#cajeroId').getValue();
            var nomcajero = viewedit.down('#nomcajeroId').getValue();     

            var view = Ext.create('Infosys_web.view.Pago_caja.Facturas').show();                   
            var nombre = "2";
            var tipdocumento = "2";
            var rut = "19";
            var nombrec = "Clientes Varios";
            var lista = 1;
            var idbodega = 1;
            var id = 1;
            view.down("#codigoId").focus();

            Ext.Ajax.request({

            url: preurl + 'correlativos/generabol?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    view.down("#numboletaId").setValue(correlanue);  
                    view.down("#nomdocumentoId").setValue(cliente.nombre); 
                    view.down("#tipodocumentoId").setValue(tipdocumento);
                    view.down("#recaudaId").setValue(recauda);
                    view.down("#id_cliente").setValue(id)
                    view.down("#rutId").setValue(rut);
                    view.down("#nombre_id").setValue(nombrec);
                    view.down('#bodegaId').setValue(idbodega)
                    view.down('#listaId').setValue(lista)
                    view.down('#cajeroId').setValue(idcajero)
                    view.down('#cajaId').setValue(idcaja)                           
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }

            }            
                }); 
            //this.validarut();
            view.down("#codigoId").focus();          
    },

    cerrarcajaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










