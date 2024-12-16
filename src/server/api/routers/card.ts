import { z } from "zod";
import { lte, and, gte, eq, inArray, like, or } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  cards,
  keywords,
  keywordsToCards,
  triggers,
  triggersToCards,
} from "~/server/db/schema";
import { uniqBy } from "lodash";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cards).all();
  }),
  getByPowerRange: publicProcedure
    .input(z.tuple([z.number(), z.number()]))
    .query(async ({ ctx, input }) => {
      const query = ctx.db
        .select()
        .from(cards)
        .where(and(gte(cards.power, input[0]), lte(cards.power, input[1])));
      const results = await query.all();
      return results;
    }),
  getPool: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (input === "") {
      const query = ctx.db.select().from(cards).all();
      return query;
    }
    const isDouble = input === "2";
    const query = ctx.db.select().from(cards).where(eq(cards.double, isDouble));
    const results = await query.all();
    return results;
  }),
  getPacks: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const query = ctx.db
        .select()
        .from(cards)
        .where(inArray(cards.pack, input));

      const results = await query.all();
      return results;
    }),
  getKeywords: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      if (input.length === 0) {
        return [];
      }

      // Query to get cards that have keywords in the input array
      const query = ctx.db
        .selectDistinct()
        .from(cards)
        .innerJoin(keywordsToCards, eq(keywordsToCards.cardId, cards.id))
        .innerJoin(keywords, eq(keywords.id, keywordsToCards.keywordId))
        .where(
          and(eq(keywordsToCards.active, true), inArray(keywords.name, input)),
        );

      const results = await query.all();

      return uniqBy(
        results.map((result) => result.cards),
        "uuid",
      );
    }),
  getTriggers: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      if (input.length === 0) {
        return [];
      }
      // Query to get cards that have keywords in the input array
      const query = ctx.db
        .selectDistinct()
        .from(cards)
        .innerJoin(triggersToCards, eq(triggersToCards.cardId, cards.id))
        .innerJoin(triggers, eq(triggers.id, triggersToCards.triggerId))
        .where(
          and(eq(triggersToCards.active, true), inArray(triggers.name, input)),
        );

      const results = await query.all();

      return uniqBy(
        results.map((result) => result.cards),
        "uuid",
      );
    }),
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = ctx.db
        .select()
        .from(cards)
        .where(
          or(
            like(cards.name, `%${input.query}%`),
            like(cards.ability, `%${input.query}%`),
          ),
        );

      const results = await query.all();
      return results;
    }),
});
