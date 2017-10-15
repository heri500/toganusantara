ALTER TABLE `detailhasilreproduksi` ADD `expired_date` DATE NULL AFTER `hargajual`;
ALTER TABLE `detailhasilreproduksi` ADD `barcode_batch` VARCHAR(255) NULL AFTER `expired_date`;
ALTER TABLE `detailhasilreproduksi` ADD `qty_sell` DOUBLE NULL AFTER `barcode_batch`;
ALTER TABLE `detailhasilreproduksi` ADD `idpenjualan` TEXT NULL AFTER `qty_sell`;

ALTER TABLE `hasilreproduksi` CHANGE `nonota` `nonota` VARCHAR(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL, CHANGE `tglhasilreproduksi` `tglhasilreproduksi` DATETIME NULL, CHANGE `idpemakai` `idpemakai` INT(11) NULL, CHANGE `total` `total` DOUBLE NULL, CHANGE `totalmodal` `totalmodal` DOUBLE NULL, CHANGE `keterangan` `keterangan` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL;