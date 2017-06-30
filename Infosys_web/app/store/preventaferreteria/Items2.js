Ext.define('Infosys_web.store.preventaferreteria.Items2', {
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