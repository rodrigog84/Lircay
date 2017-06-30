Ext.define('Infosys_web.store.preventaferreteria.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.preventaferreteria.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});