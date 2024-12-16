"use client";
import { uniq } from 'lodash';
import React, { useEffect } from 'react';
import { api } from '~/trpc/react';

import { triggers, useCardStore } from '../stores/card_store';
import { Select } from './select';

export function TriggerSelect() {
  const selected = useCardStore((state) => state.options.trigger);
  const merge = useCardStore((state) => state.merge);
  const [choice, setChoice] = React.useState<Set<string>>(new Set([]));

  const cardQuery = api.card.getTriggers.useQuery(selected)

  useEffect(() => {
    if (cardQuery.data) {
      merge(cardQuery.data, "trigger")
    }
  }, [cardQuery.isSuccess, cardQuery.data, merge])

  const setSelected = (selection: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        trigger: uniq([...state.options.trigger, selection]) as string[],
      },
    }));
  const removeSelected = (selection: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: {
        ...state.options,
        trigger: state.options.trigger.filter((s) => s !== selection),
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
      title="Trigger"
      data={triggers}
    />
  );
}
