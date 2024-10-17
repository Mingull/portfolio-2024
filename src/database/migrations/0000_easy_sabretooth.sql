CREATE TABLE `account` (
	`id` varchar(255) NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` varchar(255) NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`expiresAt` timestamp,
	`password` text,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` varchar(255) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` boolean NOT NULL,
	`image` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(255) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` timestamp NOT NULL,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;