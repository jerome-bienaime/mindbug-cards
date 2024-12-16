"use client";

import React, { useEffect } from "react";
import { Select } from "./select";
import { keywords, useCardStore } from "../stores/card_store";
import { uniq } from "lodash";
import { api } from "~/trpc/react";


export function KeywordSelect() {
  const selected = useCardStore((state) => state.options.keyword);
  const merge = useCardStore((state) => state.merge);
  const [choice, setChoice] = React.useState<Set<string>>(new Set([]));

  const cardQuery = api.card.getKeywords.useQuery(selected);

  useEffect(() => {
    if (cardQuery.data) {
      merge(cardQuery.data, "keyword");
    }
  }, [cardQuery.isSuccess, cardQuery.data, merge]);
  const setSelected = (selection: string) => {
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        keyword: uniq([...state.options.keyword, selection]) as string[],
      },
    }));
  }
  const removeSelected = (selection: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        keyword: state.options.keyword.filter((s) => s !== selection),
      },
  }))
  function handleSelect(selected: string) {
    if (selected.length === 0) {
      console.warn(`selected is empty, skipping`);
      return;
    }
    setChoice(
      (choice: Set<string>) =>
        new Set(Array.from(choice).filter((s) => s !== selected))
    );
    setSelected(selected)
  }
  function handleRemove(selected: string) {
    removeSelected(selected);
    setChoice((choice: Set<string>) => new Set([...choice, selected]));
  }

  return (
    <Select
      selection={selected}
      choice={choice}
      handleRemove={handleRemove}
      handleSelect={handleSelect}
      title="Keyword"
      data={keywords}
    />
  );
}
