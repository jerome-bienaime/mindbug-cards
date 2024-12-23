import { intersectionBy, uniq } from "lodash";
import { create } from "zustand";
import { type Card } from "~/server/db/schema";

export interface CardState {
  options: {
    power: [number, number];
    pool: string;
    pack: string[];
    keyword: string[];
    trigger: string[];
    search: string;
  };
  data: { cards: Card[] };
  cards: Card[];
  filterCards: {
    power: Card[];
    pool: Card[];
    pack: Card[];
    keyword: Card[];
    trigger: Card[];
    search: Card[];
  };
  filters: string[];
  merge: (cards: Card[], filterName: string) => void;
}

export const packs = [
  "First Contact",
  "First Contact: Add-On",
  "Beyond Eternity",
  "Beyond Evolution",
  "Promo 2022",
  "Promo 2023",
];

export const keywords = [
  "raw",
  "poisonous",
  "frenzy",
  "tough",
  "sneaky",
  "hunter",
];

export const triggers = ["play", "attack", "defeated", "none"];

const useCardStore = create<CardState>((set) => ({
  options: {
    power: [1, 10] as [number, number],
    pool: "",
    pack: packs,
    keyword: keywords,
    trigger: triggers,
    search: "",
  },
  data: { cards: [] },
  filters: [],
  cards: [],
  filterCards: {
    power: [],
    pool: [],
    pack: [],
    keyword: [],
    trigger: [],
    search: [],
  },

  merge: (cards: Card[], filterName = "all") =>
    set((state: CardState) => {
      const currentFilters: CardState["filters"] = uniq(
        [...state.filters, filterName].filter(Boolean),
      );
      const currentCards: CardState["filterCards"] = Object.assign(
        state.filterCards,
        { [filterName]: cards },
      );

      if (state.data.cards.length === 0) {
        return { ...state, data: { cards } };
      }

      const currentCardsEntries = Object.entries(currentCards);
      const isSameLength = currentCardsEntries.every(
        ([_, value]) => value.length === state.data.cards.length,
      );

      let result: Card[] = state.data.cards;
      if (!isSameLength) {
        result = currentCardsEntries.reduce(
          (acc: Card[], [_, value]: [string, Card[]]): Card[] => {
            if (value.length === 0) {
              return acc;
            }
            const intersect = intersectionBy(acc, value, "uuid");
            return intersect;
          },
          state.data.cards,
        );
      }

      return {
        ...state,
        cards: result,
        filterCards: currentCards,
        filters: currentFilters,
      } as CardState;
    }),
}));

export { useCardStore };
