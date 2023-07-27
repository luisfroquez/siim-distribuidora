CREATE TABLE `iws_product_images` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_sku` varchar(24) NOT NULL,
	`images` json DEFAULT ('null'));
--> statement-breakpoint
DROP TABLE `brands`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `iws_products` ADD `sku` varchar(24) NOT NULL;--> statement-breakpoint
ALTER TABLE `iws_products` ADD `mpn` text NOT NULL;--> statement-breakpoint
ALTER TABLE `iws_products` ADD `type` varchar(24) NOT NULL;--> statement-breakpoint
ALTER TABLE `iws_products` ADD `brand` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `iws_products` ADD `category` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `iws_products` DROP COLUMN `Sku`;--> statement-breakpoint
ALTER TABLE `iws_products` DROP COLUMN `images`;--> statement-breakpoint
ALTER TABLE `iws_products` DROP COLUMN `brand_id`;--> statement-breakpoint
ALTER TABLE `iws_products` DROP COLUMN `category_id`;