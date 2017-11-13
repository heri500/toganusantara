ALTER TABLE `diskonkategori` ADD `idproduct` BIGINT NULL AFTER `idkategori`;
ALTER TABLE `diskonkategori` ADD `id` BIGINT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);
ALTER TABLE `detailpenjualan` ADD `ppn` DOUBLE NOT NULL DEFAULT '0' AFTER `diskon`;
