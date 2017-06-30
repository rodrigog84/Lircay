Ext.util.Format.thousandSeparator = '.';
//variables globales

//var gbl_site = 'http://localhost/Infosys_web/';

var gbl_site = 'http://angus.agricultorestalca.cl/Infosys_web/';
var preurl = gbl_site + 'core/index.php/';
var preurl_img = gbl_site + 'core/archivos/';

var config_iva = 19;
var rol =  "";


Ext.application({
    
	controllers: ["General", "Clientes", "Proveedores", "Productos", 
	              "Ventas", "Facturacion", "Inventario", "Tipo_movimientos",
	              "Correlativos", "Ordencompra", "Cuentas_centralizacion", 
                  "Existencias", "Bitacora", "Tipo_movimientos_inventario",
                  "Preventa", "Pago_caja","CuentasCorrientes"],
    
    views: [
        'Infosys_web.view.WLogin',
        'Infosys_web.view.Login',
        'Infosys_web.view.usuarios.WinAddEditUsuarios',
        'Infosys_web.view.usuarios.AdminUsuarios',
        'Infosys_web.view.roles.AdminRoles',
        'Infosys_web.view.roles.WinAddEditRoles',
        'Infosys_web.view.CambioPass',
        'Infosys_web.view.movimiento_diario_inventario.BuscarProductos'
    ],

    name: 'Infosys_web',
	launch: function() {
        _myAppGlobal = this;

        if(!data_sess.modules){
            Ext.create('Infosys_web.view.Login');
        }else{
            var vport = Ext.create('Infosys_web.view.Viewport');
            var mtop = vport.down("topmenus")
            var modules = data_sess.modules
            _myAppGlobal.getController('General').modules_security(modules, mtop);
        }
    }
});