CREATE TABLE `pwa`.`mst_item` (`id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary key' , `name` VARCHAR(255) NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `deleted_at` TIMESTAMP NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;