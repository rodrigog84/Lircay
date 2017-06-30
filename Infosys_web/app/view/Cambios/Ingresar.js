Ext.define('Infosys_web.view.Cambios.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.cambiosinventario',

     requires: [
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Number',
        'Ext.toolbar.Separator'
    ],

    autoShow: true,
    height: 540,
    width: 1200,
    layout: 'fit',
    title: 'Cambio Productos',

    initComponent: function() {

        var me = this;
        var tipoCambio = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":1, "nombre":"CAMBIO"},
                {"value":2, "nombre":"DIFERENCIA"}
            ]
        });  

        var stItms = Ext.getStore('Cambios.Items');
        stItms.removeAll();
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    //allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                    {
                    xtype: 'textfield',
                    name : 'id',
                    width: 120,
                    //anchor: '25%',
                    itemId: 'numero_id',
                    labelWidth: 50,
                    fieldLabel: 'Numero'

                    },{xtype: 'splitter'},
                    {
                        xtype: 'combobox',
                        width: 300,
                        store : tipoCambio,
                        fieldLabel: 'TIPO CAMBIO',
                        labelStyle: ' font-weight:bold',
                        labelWidth: 100,
                        emptyText : 'Seleccionar',
                        editable: false,
                        itemId : 'tipoCambioId' ,
                        name : 'tipoCambio' ,
                        displayField : 'nombre',
                        valueField : 'value'
                    },{
                        xtype: 'displayfield',
                        width: 497
                       
                    },{
                        xtype: 'combo',
                        itemId: 'tipobodegaId',
                        fieldLabel: 'Bodegas',
                        forceSelection : true,
                        //anchor: '58.5%',
                        editable : false,
                        width: 220,
                        name : 'id_bodega',
                        labelWidth: 70,
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'Bodegas'
                        //allowBlank: false
                    },{
                        xtype: 'displayfield',
                        width: 120
                       
                    },{
                        xtype: 'datefield',
                        fieldLabel: 'Fecha',
                        //anchor: '25%',
                        labelWidth: 45,
                        name:'fecha',
                        format: 'd/m/Y',
                        submitFormat: 'd/m/Y',
                        itemId: 'fechaid',
                        value: new Date()
                    }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                         items: [
                            {
                                xtype: 'textfield',
                                itemId: 'id_cliente',
                                name : 'id',
                                hidden: true
                            },{
                                xtype: 'textfield',
                                fieldCls: 'required',
                                msgTarget: 'side',
                                maxHeight: 25,
                                width: 220,
                                labelWidth: 50,
                                fieldLabel: '<b>RUT</b>',
                                itemId: 'rutId',
                                name : 'rut'
                                //disabled : true                                            
                            },{
                                xtype: 'displayfield',
                                width: 20
                               
                            },{
                                xtype: 'button',
                                text: 'Buscar',
                                maxHeight: 25,
                                width: 80,
                                //allowBlank: true,
                                //disabled : true,                                            
                                action: 'validarut',
                                itemId: 'buscarBtn'
                            },{
                                xtype: 'displayfield',
                                width: 50
                               
                            },{
                                xtype: 'textfield',
                                fieldCls: 'required',
                                fieldLabel: '<b>NOMBRE</b>',
                                maxHeight: 25,
                                labelWidth: 80,
                                width: 800,
                                itemId: 'nombre_id',
                                name : 'nombre',
                                //disabled : true,                                            
                                readOnly: true
                                
                            },{
                                xtype: 'displayfield',
                                width: 50
                               
                            }]
                        },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                                xtype: 'textfield',
                                width: 160,
                                labelWidth: 70,
                                fieldLabel: '<b>Id Factura</b>',
                                itemId: 'facturaId',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{
                                xtype: 'textfield',
                                width: 160,
                                labelWidth: 70,
                                fieldLabel: '<b>Factura</b>',
                                itemId: 'numfactId',
                                style: 'font-weight: bold;'
                            },{
                                xtype: 'displayfield',
                                width: 60                               
                            },{
                                xtype: 'numberfield',
                                width: 180,
                                labelWidth: 40,
                                fieldLabel: '<b>Total</b>',
                                itemId: 'totalfactId',
                                style: 'font-weight: bold;'
                            },{
                                xtype: 'displayfield',
                                width: 60                               
                            },{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha',
                                //anchor: '25%',
                                labelWidth: 45,
                                name:'fecha',
                                format: 'd/m/Y',
                                submitFormat: 'd/m/Y',
                                itemId: 'fechafactid',
                                value: new Date()
                            },{
                                xtype: 'button',
                                text: 'Buscar Factura',
                                maxHeight: 25,
                                width: 120,
                                //allowBlank: true,
                                //disabled : true,                                            
                                action: 'buscarfactura',
                                itemId: 'buscarBtn'
                            },{
                                xtype: 'displayfield',
                                width: 30                               
                            },{
                                xtype: 'combo',
                                itemId: 'tipoVendedorId',
                                width: 250,
                                labelWidth: 80,
                                fieldCls: 'required',
                                maxHeight: 25,
                                fieldLabel: '<b>VENDEDOR</b>',
                                forceSelection : true,
                                name : 'id_vendedor',
                                valueField : 'id',
                                displayField : 'nombre',
                                emptyText : "Seleccione",
                                store : 'Vendedores'
                            }]
                        },{
                        xtype: 'fieldset',
                        title: 'Recepcion Productos',
                        height:50,
                        items: [{                     
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                xtype: 'textfield',
                                width: 140,
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;'
                            },{xtype: 'splitter'},{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 55,
                                itemId: 'nombreproductoId',
                                fieldLabel: 'Producto',
                                name: 'nomproducto',                                
                                readOnly: true
                            },{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'productoId',
                                fieldLabel: 'Producto',
                                name: 'Productos',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Producto',
                                maxHeight: 25,
                                width: 120,
                                //allowBlank: true,
                                action: 'buscarproductosfacturas',
                                itemId: 'buscarproc'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 160,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;',
                                readOnly: true
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 160,
                                labelWidth: 70,
                                minValue: 0,
                                fieldLabel: 'Vendida',
                                readOnly: true,
                                itemId: 'cantidadOriginalId',
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 160,
                                labelWidth: 70,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Devolucion',
                                itemId: 'cantidadId'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 160,
                                labelWidth: 70,
                                minValue: 0,
                                fieldLabel: 'Total',
                                itemId: 'totdevId',
                                readOnly: true
                            }]
                            }],
                        },{
                        xtype: 'fieldset',
                        title: 'Devolucion Productos',
                        height:50,
                        items: [{                     
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                                xtype: 'textfield',
                                width: 140,
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                itemId: 'codigodevId',
                                style: 'font-weight: bold;'
                            }, {xtype: 'splitter'},{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 55,
                                itemId: 'nombreproductodevId',
                                fieldLabel: 'Producto',
                                name: 'nomproducto',                                
                                readOnly: true
                            },{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'productodevId',
                                fieldLabel: 'Producto',
                                name: 'Productos',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Producto',
                                maxHeight: 25,
                                width: 120,
                                //allowBlank: true,
                                action: 'buscarproductosdevolucion',
                                itemId: 'buscarproc'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 180,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'preciodevId',
                                style: 'font-weight: bold;',
                                readOnly: true
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 180,
                                labelWidth: 70,
                                minValue: 0,
                                fieldLabel: 'Recepcion',
                                readOnly: true,
                                itemId: 'cantidadOriginaldevId',
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 180,
                                labelWidth: 70,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Entrega',
                                itemId: 'cantidaddevId'
                                //readOnly: true
                            },{xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 80,
                                //allowBlank: true,
                                action: 'agregarItem'
                            }]
                            }],
                        },{
                          xtype: 'fieldset',
                          title: 'Ingreso Inventario',
                          height:270,
                          items: [{
                                  xtype: 'grid',
                                  tbar: [

                                    {
                                        /*xtype: 'button',
                                        text: 'Eliminar',
                                        iconCls: 'icon-delete',
                                        //allowBlank: true,
                                        action: 'eliminarInventarioInicial'*/
                                    }
                                    ],
                                  itemId: 'cambiosId',
                                  title: 'Cambio de productos',
                                  store: 'Cambios.Items',
                                  height: 300,
                                  columns: [
                                      { text: 'Id',  dataIndex: 'id', width: 50, hidden: true },
                                      { text: 'Identrada',  dataIndex: 'id_entrada', width: 50, hidden: true },
                                      { text: 'Producto Entrada',  dataIndex: 'nom_entrada', width: 250},
                                      { text: 'Cant.Entrada',  dataIndex: 'can_entrada', width: 150},
                                      { text: 'Precio.Entrada',  dataIndex: 'val_entrada', width: 150, hidden:true},
                                      { text: 'idsalida', dataIndex: 'id_salida', width: 50, hidden: true},
                                      { text: 'Producto Salida', dataIndex: 'nom_salida', width: 250},
                                      { text: 'Cant.Salida',  dataIndex: 'can_salida', width: 150},
                                      { text: 'Precio.Salida',  dataIndex: 'val_salida', width: 150, hidden:true},
                                      { text: 'Id Factura',  dataIndex: 'id_factura', width: 150, hidden:true},
                                  ]
                              }],
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarCambios'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
