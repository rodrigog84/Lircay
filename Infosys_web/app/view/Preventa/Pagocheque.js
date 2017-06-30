Ext.define('Infosys_web.view.Preventa.Pagocheque', {
    extend: 'Ext.window.Window',
    alias : 'widget.generapagocheque',

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
    height: 460,
    width: 1310,
    layout: 'fit',
    title: 'Pago Cheque Caja',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('recaudacion.Items');
        stItms.removeAll();
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    margin: 8,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                        xtype: 'fieldset',
                        title: 'Condicion Venta',
                        align: 'top',

                        fieldDefaults: {
                        labelWidth: 120
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 10,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'validapagoId',
                            fieldLabel: '<b>VALIDA</b>',
                            hidden: true
                        },{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 180,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'condpagoId',
                            fieldLabel: '<b>FORMA PAGO</b>',
                            fieldCls: 'required',
                            store: 'Cond_pago',
                            name: 'cond_pago',
                            valueField: 'id',
                            displayField: 'nombre',
                            readOnly: true
                           
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 180,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'numchequeId',
                            fieldLabel: '<b>NUMCHEQUE</b>',
                            value: 0,
                            labelAlign: 'top',
                            disabled : false  
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 180,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'numfacturaId',
                            fieldLabel: '<b>NUMDOCUMENTO</b>',
                            value: 0,
                            labelAlign: 'top',
                            hidden: true
                        },{xtype: 'splitter'},{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 210,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'bancoId',
                            fieldLabel: '<b>BANCO</b>',
                            fieldCls: 'required',
                            store: 'Banco',
                            name: 'banco',
                            valueField: 'id',
                            displayField: 'nombre',
                            disabled : false  
                           
                        },{xtype: 'splitter'},
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'fecha_cheq',
                            itemId: 'fechacheqId',
                             format: 'd/m/Y',
                             submitFormat: 'd/m/Y',
                            fieldLabel: '<b>FECHA</b>',
                            labelAlign: 'top',

                            value: new Date()
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valorcheque',
                            value: 0,
                            minValue: 0,
                            itemId: 'valorchequeId',
                            fieldLabel: '<b>VALOR CHEQUE</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valorpago',
                            value: 0,
                            minValue: 0,
                            readOnly: true,
                            itemId: 'valorpagoId',
                            fieldLabel: '<b>VALOR PAGO</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'button',
                            text: 'Agregar',
                            iconCls: '',
                            maxHeight: 60,
                            scale: 'large',
                            labelAlign: 'top',
                            action: 'agregarrecaudacion'
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valortotal',
                            itemId: 'valortotalId',
                            value : 0,
                            fieldLabel: '<b>TOTAL</b>',
                            hidden : true
                        }]
                    }
                    ]

                },{
                  xtype: 'fieldset',
                  title: 'Recaudacion ',
                  height: 230,
                  items: [{
                          xtype: 'grid',
                          tbar: [

                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                iconCls: 'icon-delete',
                                allowBlank: true,
                                action: 'eliminaritem'
                            }
                            ],
                          itemId: 'recaudacionId',
                          title: 'Ingreso',
                          store: 'recaudacion.Items',
                          height: 200,
                          columns: [
                              { text: 'Forma Pago',  dataIndex: 'nom_forma', width: 250 },
                              { text: 'Documento',  dataIndex: 'num_cheque', width: 100},
                              { text: 'Nombre Banco',  dataIndex: 'detalle', width: 200},
                              { text: 'Id_banco',  dataIndex: 'id_banco', width: 200, hidden: true},
                              { text: 'Valor', dataIndex: 'valor_pago', width: 150},
                              { text: 'Valor Cancela', dataIndex: 'valor_cancelado', width: 150, hidden: true},
                              { text: 'Fecha Docu', dataIndex: 'fecha_comp',hidden: true, width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')}
                             
                          ]
                      }],
            }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',
                        {
                            xtype: 'tbseparator'
                        },{
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            //labelWidth: 30,
                            itemId: 'aceptacheques',
                            disabled : false,
                            maxHeight: 40,
                            action: 'aceptacheques',
                            text: 'Aceptar'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
