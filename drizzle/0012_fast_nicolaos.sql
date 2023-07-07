CREATE TABLE `brands` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`manufacturer_id` varchar(12) NOT NULL,
	`brand_id` varchar(12) NOT NULL,
	`description` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`category_id` varchar(12) NOT NULL,
	`description` text NOT NULL,
	`path` json DEFAULT ('null'));
--> statement-breakpoint
CREATE TABLE `iws_products` (
	`Sku` varchar(12) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`brand_id` varchar(12) NOT NULL,
	`category_id` varchar(12) NOT NULL);
