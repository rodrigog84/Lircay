Ext.define('Infosys_web.view.Pago_caja.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pagocajaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Pago en Caja',
    store: 'Factura5',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id Factura",
        flex: 1,
        dataIndex: 'id',
        align: 'right',
        hidden: true
               
    },{
        header: "Tipo",
        flex: 1,
        dataIndex: 'id_tip_docu',
        align: 'right',
        hidden: true
               
    },{
        header: "Id Tipo",
        flex: 1,
        dataIndex: 'nombre_docu',
        align: 'right'
               
    },{
        header: "Id Cliente",
        flex: 1,
        dataIndex: 'id_cliente',
        align: 'right',
        hidden: true
               
    },{
        header: "Numero Documento",
        flex: 1,
        dataIndex: 'num_factura',
        align: 'right'
               
    },{
        header: "Fecha Emision ",
        flex: 1,
        dataIndex: 'fecha_factura',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Fecha Venc.",
        flex: 1,
        dataIndex: 'fecha_venc',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut_cliente',
        align: 'right'

    },{
        header: "Razon Social",
         width: 390,
        dataIndex: 'nombre_cliente'
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor',
        hidden: true
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'sub_total',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}     
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "Afecto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "I.V.A",
        flex: 1,
        dataIndex: 'iva',
         hidden: true,
         align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "Total",
        flex: 1,
        dataIndex: 'totalfactura',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'generarpago',
                text : 'Cancela Venta'
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'numberfield',
                itemId: 'recaudaId',
                fieldLabel: 'Recauda',
                readOnly: true,
                hidden :true
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'textfield',
                itemId: 'cajaId',
                fieldLabel: 'Caja',
                readOnly: true,
                hidden :true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'nomcajaId',
                fieldLabel: 'Caja',
                labelAlign: 'top',
                readOnly: true
            },{
                width: 100,
                xtype: 'textfield',
                itemId: 'cajeroId',
                fieldLabel: 'Cajero',
                readOnly: true,
                hidden: true
            },{
                width: 210,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'nomcajeroId',
                labelAlign: 'top',
                fieldLabel: 'Cajero',
                readOnly: true
            },{
                width: 110,
                xtype: 'numberfield',
                itemId: 'efectivonId',
                fieldLabel: 'Efectivo',
                hidden: true
            },{
                width: 110,
                xtype: 'numberfield',
                itemId: 'comprobanteId',
                fieldLabel: 'Comprobante',
                hidden: true
            },{
                xtype: 'textfield',
                fieldCls: 'required',
                width: 100,
                name : 'efectivo',
                itemId: 'efectivoId',
                readOnly: true,
                aling: 'center',
                fieldLabel: 'Efectivo',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(efectivo),"0.000")}

            },{
                width: 140,
                labelWidth: 50,
                xtype: 'numberfield',
                itemId: 'totchequesnId',
                fieldLabel: 'Cheques',
                hidden: true
            },{
                width: 100,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'totchequesId',
                fieldLabel: 'Cheques',
                name: 'cheques',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(cheques),"0,00")},
                readOnly: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'numberfield',
                itemId: 'otrosmontosnId',
                labelAlign: 'top',
                fieldLabel: 'Otros',
                hidden: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'otrosmontosId',
                labelAlign: 'top',
                name: 'otros',
                fieldLabel: 'Otros',
                renderer: function(valor){return Ext.util.Format.number(parseInt(otros),"0,00")},
                readOnly: true
            },{
                xtype: 'datefield',
                fieldCls: 'required',
                //maxHeight: 25,
                labelWidth: 60,
                labelAlign: 'top',
                width: 100,
                fieldLabel: '<b>Fecha</b>',
                itemId: 'fechaaperturaId',
                name: 'fecha_apertura'
            },'->',{
                width: 140,
                labelWidth: 55,
                xtype: 'textfield',
                itemId: 'nombresId',
                fieldLabel: 'Ticket'
            },{
                xtype: 'button',
                width: 80,
                iconCls: 'icon-search',
                action: 'generaticket',
                text : 'PAGAR'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcajaventa',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Factura5',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
