ALTER TABLE `session` ADD `impersonatedBy` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD `role` text;--> statement-breakpoint
ALTER TABLE `user` ADD `banned` boolean;--> statement-breakpoint
ALTER TABLE `user` ADD `banReason` text;--> statement-breakpoint
ALTER TABLE `user` ADD `banExpires` int;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_impersonatedBy_user_id_fk` FOREIGN KEY (`impersonatedBy`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;