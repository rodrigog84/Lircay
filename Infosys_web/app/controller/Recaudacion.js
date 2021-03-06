Ext.define('Infosys_web.controller.Recaudacion', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Recauda',
            'recaudacion.Selector'],

    models: ['Recauda'],

    views: ['recaudacion.Principal',
            'recaudacion.Exportar',
            'recaudacion.ExportarPdf'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'recaudacionprincipal',
        selector: 'recaudacionprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'exportarrecaudacion',
        selector: 'exportarrecaudacion'
    },{
        ref: 'pdfexportarrecaudacion',
        selector: 'pdfexportarrecaudacion'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mrecauda]': {
                click: this.mrecauda
            },
            
            'recaudacionprincipal button[action=cerrarrecaudacion]': {
                click: this.cerrarrecaudacion
            },
            'recaudacionprincipal button[action=exportarecauda]': {
                click: this.exportarecauda
            },
            'recaudacionprincipal button[action=exportarecaudapdf]': {
                click: this.exportarecaudapdf
            },
            'recaudacionprincipal button[action=editarrecaudacion]': {
                click: this.editarrecaudacion
            },
            'recaudacionprincipal button[action=buscarrecaudacion]': {
                click: this.buscarrecaudacion
            },
            'recaudacionprincipal button[action=exportarrecaudacionPdf]': {
                click: this.exportarrecaudacionPdf
            },
            'exportarrecaudacion button[action=exportarexcelrecaudacion]': {
                click: this.exportarexcelrecaudacion
            },
            'recaudacionprincipal button[action=exportarecaudadetalle]': {
                click: this.exportarecaudadetalle
            },
            'recaudacionprincipal button[action=exportarlibrorecaudacion]': {
                click: this.exportarlibrorecaudacion
            },
            'pdfexportarrecaudacion button[action=exportarpdfrecaudacion]': {
                click: this.exportarpdfrecaudacion
            },




            
           
        });
    },    

    editarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.existencia.detalle_existencias').show();
            var nombre = (row.get('id_producto'));
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

    exportarrecaudacionPdf: function(){
        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'recaudacion/exportRecaudacionPDF/?idrecaudacion=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    cerrarrecaudacion: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mrecauda: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var st = this.getRecaudaStore()
        st.load();
        viewport.add({xtype: 'recaudacionprincipal'});
    },

    exportarecauda : function(){

        Ext.create('Infosys_web.view.recaudacion.Exportar');
    },

    exportarlibrorecaudacion : function(){

        Ext.create('Infosys_web.view.recaudacion.ExportarPdf');
    },

    exportarpdfrecaudacion : function(){

        var jsonCol = new Array()
        var i = 0;        
        var view = this.getPdfexportarrecaudacion();
        var grid = this.getRecaudacionprincipal();
        var fecha2 = view.down('#fechaId').getSubmitValue();
        var tipo = view.down('#tipoId').getSubmitValue();
        var concaja = view.down('#cajaId');
        var stCombo = concaja.getStore();
        var caja = stCombo.findRecord('id', concaja.getValue()).data;
        var idcaja = caja.id;
        var nomcaja = caja.nombre;
        var condicion = view.down('#cajeroId');
        var stCombo = condicion.getStore();
        var cajero = stCombo.findRecord('id', condicion.getValue()).data;
        var idcajero = cajero.id;
        var nomcajero = cajero.nombre;

        if (!idcaja){

             Ext.Msg.alert('Alerta', 'Selecciona Caja.');
            return;
            

        };

        if (!idcajero){

             Ext.Msg.alert('Alerta', 'Selecciona Cajero.');
            return;
            

        };

        if (!tipo){

             Ext.Msg.alert('Alerta', 'Selecciona Tipo Informe.');
            return;
            

        };

       
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })
        
        window.open(preurl + 'recaudacion/exportarPdflibroRecauda?cols='+Ext.JSON.encode(jsonCol)+'&idcajero='+idcajero+'&idcaja='+idcaja+'&fecha2='+fecha2+'&tipo='+tipo+'&nomcaja='+nomcaja+'&nomcajero='+nomcajero);

        view.close();
   },

    exportarexcelrecaudacion: function(){


        var jsonCol = new Array()
        var i = 0;        
        var view = this.getExportarrecaudacion();
        var grid = this.getRecaudacionprincipal();
        var fecha2 = view.down('#fechaId').getSubmitValue();
        var tipo = view.down('#tipoId').getSubmitValue();

        var concaja = view.down('#cajaId');
        var stCombo = concaja.getStore();
        var caja = stCombo.findRecord('id', concaja.getValue()).data;
        var idcaja = caja.id;
        var nomcaja = caja.nombre;

        var condicion = view.down('#cajeroId');
        var stCombo = condicion.getStore();
        var cajero = stCombo.findRecord('id', condicion.getValue()).data;
        var idcajero = cajero.id;
        var nomcajero = cajero.nombre;
        
        


        if (!idcaja){

             Ext.Msg.alert('Alerta', 'Selecciona Caja.');
            return;
            

        };

        if (!idcajero){

             Ext.Msg.alert('Alerta', 'Selecciona Cajero.');
            return;
            

        };

        if (!tipo){

             Ext.Msg.alert('Alerta', 'Selecciona Tipo Informe.');
            return;
            

        };

       
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelrecaudacion?cols='+Ext.JSON.encode(jsonCol)+'&idcajero='+idcajero+'&idcaja='+idcaja+'&fecha2='+fecha2+'&tipo='+tipo+'&nomcaja='+nomcaja+'&nomcajero='+nomcajero);

        view.close();
   },

   
    buscarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
        var st = this.getRecaudaStore()
        var nombre = view.down('#productosId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

   },

    
  
});










