"use client";

import { Box, Select, Text } from '@chakra-ui/react';
import { api } from '~/trpc/react';
import { useCardStore } from '../stores/card_store';
import { useEffect } from 'react';

export function PoolSelect() {
  const value = useCardStore((state) => state.options.pool);
  const merge = useCardStore((state) => state.merge);
  const setValue = (value: string) =>
    useCardStore.setState((state) => ({
      ...state,
      options: { ...state.options, pool: value },
    }));

  const cardQuery = api.card.getPool.useQuery(value);

  useEffect(() => {
    if (cardQuery.isSuccess) {
      merge(cardQuery.data, "pool");
    }
  }, [cardQuery.isSuccess, cardQuery.data, merge]);

  function handleOnSelect(event: any) {
    console.log("event.target.value", event.target.value);
    setValue(event.target.value);
  }

  return (
    <Box px="2">
      <Box textAlign={"center"} h={8}>
        <Text fontSize="lg" as="b" color="pink.200">
          Pool
        </Text>
      </Box>
      <Select
        placeholder="all card pools"
        size="md"
        value={value}
        onChange={handleOnSelect}
      >
        <option value="1">single</option>
        <option value="2">double</option>
      </Select>
    </Box>
  );
}
