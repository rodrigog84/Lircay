
ALTER TABLE `existencia`
	ADD INDEX `id_producto` (`id_producto`);	
ALTER TABLE `productos`
	ADD COLUMN `fecha_ult_compra` DATE NOT NULL AFTER `p_may_compra`;

CREATE TABLE `factura_compras` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`tipo_documento` INT(11) NOT NULL,
	`id_proveedor` INT(11) NOT NULL,
	`id_sucursal` INT(11) NOT NULL,
	`id_vendedor` INT(11) NOT NULL,
	`id_mecanicos` INT(11) NOT NULL,
	`num_factura` INT(11) NOT NULL,
	`id_cond_venta` INT(11) NOT NULL,
	`sub_total` INT(20) NOT NULL,
	`descuento` INT(20) NOT NULL,
	`neto` INT(20) NOT NULL,
	`iva` INT(20) NOT NULL,
	`totalfactura` INT(20) NOT NULL,
	`fecha_factura` DATE NOT NULL,
	`fecha_venc` DATE NOT NULL,
	`id:factura` INT(11) NOT NULL,
	`observacion` TEXT NOT NULL,
	`id_observa` INT(11) NOT NULL,
	`id_despacho` INT(11) NOT NULL,
	`estado` VARCHAR(2) NOT NULL,
	`forma` INT(11) NOT NULL,
	`tipo_boleta` VARCHAR(1) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;	


CREATE TABLE `empresa` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`rut` INT(11) NULL DEFAULT '0',
	`dv` CHAR(1) NULL DEFAULT '0',
	`razon_social` VARCHAR(100) NULL DEFAULT '',
	`giro` VARCHAR(100) NULL DEFAULT '',
	`cod_actividad` INT(11) NULL DEFAULT '0',
	`dir_origen` VARCHAR(100) NULL DEFAULT '',
	`comuna_origen` VARCHAR(100) NULL DEFAULT '',
	`fec_resolucion` DATE NULL DEFAULT NULL,
	`nro_resolucion` INT(11) NULL DEFAULT NULL,
	`logo` VARCHAR(50) NULL DEFAULT NULL,
	`created_at` DATETIME NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
