Ext.define('Infosys_web.store.Ordencompra_recepcion', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Orden_compra',
    autoLoad: true,
    pageSize: 14,

     proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'ordencompra/getAllrecepcion',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});

   
    