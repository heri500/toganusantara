CREATE TABLE `production_product` ( `id` BIGINT NOT NULL AUTO_INCREMENT ,
  `barcode` VARCHAR(30) NULL ,  `product_code` VARCHAR(100) NOT NULL ,
  `product_name` VARCHAR(255) NOT NULL ,  `unit` VARCHAR(100) NOT NULL DEFAULT 'KG' ,
  `product_desc` TEXT NULL ,  `created` DATETIME NULL ,
  `changed` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,  `uid` INT NULL ,
  `uid_changed` INT NULL ,
  PRIMARY KEY  (`id`),
  INDEX  (`product_name`),
  INDEX  (`product_code`),
  INDEX  (`unit`))
  ENGINE = MyISAM;

CREATE TABLE `production_bom` ( `id` BIGINT NOT NULL AUTO_INCREMENT ,
  `id_production_product` BIGINT NOT NULL ,  `id_product` BIGINT NOT NULL ,
  `id_parent` BIGINT NULL ,  `qty_bom` DOUBLE NOT NULL DEFAULT '0' ,
  `created` DATETIME NULL ,  `changed` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `uid` INT NULL ,  `uid_changed` INT NULL ,
  PRIMARY KEY  (`id`),
  INDEX  (`id_production_product`),
  INDEX  (`id_product`),
  INDEX  (`id_parent`))
  ENGINE = MyISAM;