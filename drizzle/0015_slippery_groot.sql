CREATE TABLE `quotes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`items` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `iws_product_images`;--> statement-breakpoint
DROP TABLE `iws_products`;