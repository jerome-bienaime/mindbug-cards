"use client";

import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { FilterBar } from "./_components/filter_bar";
import _ from "lodash";
import { useCardStore } from "./stores/card_store";
import { useEffect } from "react";

export function App({ cards }: { cards: any }) {
  const merge = useCardStore((state) => state.merge);
  const cardStore = useCardStore((state) => state.cards);

  useEffect(() => {
      merge(cards);
  }, [merge]);

  return (
    <main>
      <Box display="flex" my="3" justifyContent={"center"}>
        <Image src="./logo.png" alt="Mindbug" width="128px" height="auto" />
      </Box>
      <FilterBar />
      <Grid templateColumns="repeat(12, 1fr)" gap={1} mx={1}>
        {cardStore.map((card: any) => {
          const re = /\s+/g;
          const cardImg = card.name!.replace(re, "_");
          return (
            <GridItem colSpan={2} key={card.id}>
              <Image
                src={`./img/${cardImg}.jpg`}
                alt={`img for ${card.name}`}
                width="100%"
                height="auto"
              />
            </GridItem>
          );
        })}
      </Grid>
    </main>
  );
}
