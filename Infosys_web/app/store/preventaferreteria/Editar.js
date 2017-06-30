Ext.define('Infosys_web.store.preventaferreteria.Editar', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.preventaferreteria.Item',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'preventa/edita',
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});