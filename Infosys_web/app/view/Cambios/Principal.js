Ext.define('Infosys_web.view.Cambios.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cambiosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Cambio de Productos',
    store: 'Cambios',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id ",
        width: 390,
        dataIndex: 'id',
         hidden: true        
    },{
        header: "Numero",
        width: 80,
        dataIndex: 'num_comprobante'
        
    },{
        header: "Bodega",
        flex: 1,
        dataIndex: 'nom_bodega'
    },{
        header: "Rut",
        width: 120,
        dataIndex: 'rut_cliente'
    },{
        header: "Cliente",
        width: 380,
        dataIndex: 'nom_cliente'
    },{
        header: "Fecha",
        flex: 1,
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        dataIndex: 'fecha_cambio'
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Realizar Cambio',
                action:'agregarcambios'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:''
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 100,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'facturas.Selector2'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcambios',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcambios',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cambios',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
