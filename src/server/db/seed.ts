import * as schema from "./schema";
import * as fs from "fs";
import path from "path";
import { db } from "./index";

export async function main(db: any) {
  const { data: creatures } = JSON.parse(
    fs.readFileSync(path.join("src", "server", "db", "creatures.json"), "utf-8")
  );

  const keywords = [
    { name: "poisonous" },
    { name: "frenzy" },
    { name: "tough" },
    { name: "sneaky" },
    { name: "hunter" },
    { name: "raw" },
  ];

  const triggers = [
    { name: "play" },
    { name: "attack" },
    { name: "defeated" },
    { name: "none" },
  ];

  const startSeed = new Date().getTime();

  // Insert keywords and keep track of their IDs
  const keywordIds = await Promise.all(
    keywords.map(async (keyword) => {
      const [insertedKeyword] = await db
        .insert(schema.keywords)
        .values(keyword)
        .returning({ id: schema.keywords.id });
      return { ...keyword, id: insertedKeyword.id };
    })
  );

  // Insert triggers and keep track of their IDs
  const triggerIds = await Promise.all(
    triggers.map(async (trigger) => {
      const [insertedTrigger] = await db
        .insert(schema.triggers)
        .values(trigger)
        .returning({ id: schema.triggers.id });
      return { ...trigger, id: insertedTrigger.id };
    })
  );

  let count = 1;
  // Insert creatures and their associations
  for (const creature of creatures) {
    const card = {
      uuid: creature.id,
      name: creature.name,
      power: creature.power,
      ability: creature.ability,
      double: creature.double,
      pack: creature.pack,
      evolution: creature.evolution || false,
      evolved: creature.evolved || false,
    };

    // Insert the card and get the inserted card's ID
    const [cardInserted] = await db
      .insert(schema.cards)
      .values(card)
      .returning({ id: schema.cards.id });

    // Insert keywords for the card
    await Promise.all(
      Object.entries(creature.keywords).map(async ([keyword, value]) => {
        const keywordId = keywordIds.find((k) => k.name === keyword)?.id;
        if (keywordId) {
          await db.insert(schema.keywordsToCards).values({
            cardId: cardInserted.id,
            keywordId,
            active: Boolean(value),
          });
        }
      })
    );

    // To assign <raw> keyword to creature,
    // if creature has keywords, set <raw> to `false`
    // else, set <raw> to `true`
    const rawId = keywordIds.find((k) => k.name === "raw")?.id;
    const hasKeyword = Object.entries(creature.keywords).some(([_, value]) => {
      return value === true;
    });
    if (!hasKeyword) {
      console.info(
        `\t+ card with ${creature.name}(${
          cardInserted.id
        }) has no keyword, affecting keyword id ${rawId} to active: ${!hasKeyword}`
      );
    }
    await db.insert(schema.keywordsToCards).values({
      cardId: cardInserted.id,
      keywordId: rawId,
      active: !hasKeyword,
    });

    // Insert triggers for the card
    await Promise.all(
      Object.entries(creature.triggers).map(async ([trigger, value]) => {
        const triggerId = triggerIds.find((t) => t.name === trigger)?.id;
        if (triggerId) {
          await db.insert(schema.triggersToCards).values({
            cardId: cardInserted.id,
            triggerId,
            active: Boolean(value),
          });
        }
      })
    );

    // To assign <none> trigger to creature,
    // if creature has triggers, set <none> to `false`
    // else set to `true`
    const noneId = triggerIds.find((t) => t.name === "none")?.id
    const hasTrigger = Object.entries(creature.triggers).some(([_, value]) => {
      return value === true;
    });
    if (!hasTrigger) {
      console.info(
        `\t+ card with ${creature.name}(${
          cardInserted.id
        }) has no effect, affecting trigger id ${rawId} to active: ${!hasTrigger}`
      );
    }
    await db.insert(schema.triggersToCards).values({
      cardId: cardInserted.id,
      triggerId: noneId,
      active: !hasTrigger,
    });

    console.info(
      `[${count}/${creatures.length}] Inserted creature: ${creature.name} from ${creature.pack}`
    );

    count++;
  }
  const endSeed = new Date().getTime();

  console.info(`${(endSeed - startSeed) / 1000} seconds`);
}

main(db);
