CREATE TABLE `app_cards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text(256),
	`name` text(256),
	`power` integer,
	`ability` text(256),
	`double` integer DEFAULT false NOT NULL,
	`pack` text(256),
	`evolution` integer DEFAULT false,
	`evolved` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `app_keywords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256)
);
--> statement-breakpoint
CREATE TABLE `app_keywordsToCards` (
	`keywordId` integer NOT NULL,
	`cardId` integer NOT NULL,
	`active` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `app_triggers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256)
);
--> statement-breakpoint
CREATE TABLE `app_triggersToCards` (
	`triggerId` integer NOT NULL,
	`cardId` integer NOT NULL,
	`active` integer NOT NULL
);
