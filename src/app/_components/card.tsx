"use client";

import { api } from "~/trpc/react";

export function AllCards() {
  const [cards] = api.card.getAll.useSuspenseQuery();

  return (
    <div>
      {cards.map((card) => {
        return <p key={card.id}>{card.name}</p>;
      })}
    </div>
  );
}
