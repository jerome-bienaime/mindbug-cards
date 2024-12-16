"use client";
import { uniq } from 'lodash';
import React, { useEffect } from 'react';
import { api } from '~/trpc/react';

import { packs, useCardStore } from '../stores/card_store';
import { Select } from './select';

export function PackSelect() {
  const selected = useCardStore((state) => state.options.pack);
  const merge = useCardStore((state) => state.merge);
  const [choice, setChoice] = React.useState<Set<string>>(new Set([]));

  const cardQuery = api.card.getPacks.useQuery(selected);

  useEffect(() => {
    if (cardQuery.data) {
      merge(cardQuery.data, "pack");
    }
  }, [cardQuery.isSuccess, cardQuery.data, merge]);

  const setSelected = (selection: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        pack: uniq([...state.options.pack, selection]) as string[],
      },
    }));
  const removeSelected = (selection: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        pack: state.options.pack.filter((s) => s !== selection),
      },
    }));
  function handleSelect(selected: string) {
    if (selected.length === 0) {
      console.warn(`selected is empty, skipping`);
      return;
    }
    setChoice(
      (choice: Set<string>) =>
        new Set(Array.from(choice).filter((s) => s !== selected))
    );
    setSelected(selected);
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
      title="Pack"
      data={packs}
    />
  );
}
