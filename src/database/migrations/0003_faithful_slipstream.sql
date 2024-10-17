ALTER TABLE `invitation` DROP FOREIGN KEY `invitation_inviterId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `invitation` MODIFY COLUMN `inviterId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `invitation` ADD CONSTRAINT `invitation_inviterId_user_id_fk` FOREIGN KEY (`inviterId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;