CREATE TABLE `invitation` (
	`id` varchar(255) NOT NULL,
	`organizationId` varchar(255) NOT NULL,
	`email` text NOT NULL,
	`role` text,
	`status` text NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`inviterId` text NOT NULL,
	CONSTRAINT `invitation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `member` (
	`id` varchar(255) NOT NULL,
	`organizationId` varchar(255) NOT NULL,
	`userId` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`createdAt` timestamp NOT NULL,
	CONSTRAINT `member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization` (
	`id` varchar(255) NOT NULL,
	`name` text NOT NULL,
	`slug` text,
	`logo` text,
	`createdAt` timestamp NOT NULL,
	`metadata` text,
	CONSTRAINT `organization_id` PRIMARY KEY(`id`),
	CONSTRAINT `organization_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `invitation` ADD CONSTRAINT `invitation_organizationId_organization_id_fk` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `invitation` ADD CONSTRAINT `invitation_inviterId_user_id_fk` FOREIGN KEY (`inviterId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `member` ADD CONSTRAINT `member_organizationId_organization_id_fk` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE cascade ON UPDATE cascade;