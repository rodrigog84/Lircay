Ext.define('Ferrital_web.view.facturaelectronica.CargaCertificadoDigital' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.cargacertificadodigital',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Carga Certificado Digital',
    autoHeight: true,

    autoShow: true,
    width: 1200,
    height: 450,
  items: [{
        xtype: 'form',
        bodyPadding: 10,
        frame: true,
        border: false,
        items: [
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
                xtype: 'filefield',
                id: 'form-file',
                emptyText: 'Certificado .p12',
                fieldLabel: 'Certificado Digital',
                labelWidth: 100,
                name: 'certificado',
                buttonText: 'Examinar',
                listeners:{
                    afterrender:function(cmp){
                      cmp.fileInputEl.set({
                        accept:'.p12' // or w/e type
                      });
                    }
                }              
            }

            ]
        }],
        buttons: [{
            text: 'Cargar',
            handler: function() {
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: preurl + 'facturas/cargacertificado',
                        waitMsg: 'Cargando Certificado...',
                        success: function(fp, o) {
                            Ext.Msg.alert('Exito', 'El certificado "' + o.result.file + '" ha sido cargado.');
                        }
                    });
                }
            }
        }]        
    }]
});
