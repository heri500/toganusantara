ALTER TABLE `pelanggan` ADD `status_pelanggan` TINYINT NOT NULL DEFAULT '0' AFTER `password`;
ALTER TABLE `penjualan` ADD `status_pelanggan` TINYINT NOT NULL DEFAULT '0' AFTER `changed`;