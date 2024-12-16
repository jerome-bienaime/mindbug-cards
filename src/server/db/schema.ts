// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `app_${name}`);

export const keywords = createTable("keywords", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
});

export const triggers = createTable("triggers", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
});

export const cards = createTable("cards", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  uuid: text("uuid", { length: 256 }),
  name: text("name", { length: 256 }),
  power: int("power", { mode: "number" }),
  ability: text("ability", { length: 256 }),
  double: int("double", { mode: "boolean" }).notNull().default(false),
  pack: text("pack", { length: 256 }),
  evolution: int("evolution", { mode: "boolean" }).default(false),
  evolved: int("evolved", { mode: "boolean" }).default(false),
});

export const keywordsToCards = createTable("keywordsToCards", {
  keywordId: int("keywordId", { mode: "number" }).notNull(),
  cardId: int("cardId", { mode: "number" }).notNull(),
  active: int("active", { mode: "boolean" }).notNull(),
});

export const triggersToCards = createTable("triggersToCards", {
  triggerId: int("triggerId", { mode: "number" }).notNull(),
  cardId: int("cardId", { mode: "number" }).notNull(),
  active: int("active", { mode: "boolean" }).notNull(),
});
