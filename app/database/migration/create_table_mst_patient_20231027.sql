CREATE TABLE `pwa`.`mst_patient` (`id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primari key' , `no_registration` INT NULL , `no_rm` VARCHAR(255) NULL , `nama_pasien` VARCHAR(255) NULL , `tgl_lahir` DATE NULL , `kelas` VARCHAR(255) NULL , `ruang` VARCHAR(255) NULL , `no_bed` INT NULL , `handphone` INT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;