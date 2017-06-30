Ext.define('Infosys_web.store.Boleta', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Boletas',
    autoLoad: true,
    //pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'boleta/save', 
            read: preurl + 'boleta/getAll',
            update: preurl + 'boleta/update'
            //destroy: 'php/deletaContacto.php'
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