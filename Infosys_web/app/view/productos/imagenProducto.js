Ext.define('Infosys_web.view.productos.imagenProducto' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.imagenProducto',
    
    title : 'Imagen Producto',
    autoHeight: false,

    autoShow: true,
    width: 400,
    height: 400,
    initComponent: function() {
        me = this;
        var path_imagen = me.path_imagen;        
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: false,
                style: 'background-color: #fff;',
                waitMsgTarget: true, 
                //icon: 'images/download-icon.png',  // Use a URL in the icon config
                viewConfig:{
                    loadingCls: 'images/download-icon.png'
                },                
                items: [
                            {
                            xtype: 'image',
                            name: 'logo_img',
                            itemId : 'logo_img',
                            src : path_imagen,
                            width: 350,
                            height : 350,
                            labelWidth: 150,
                            labelStyle: ' font-weight:bold',                            
                            border: true,                   
                            }
                ],
            }
        ];
        
        this.callParent(arguments);
    }
});
