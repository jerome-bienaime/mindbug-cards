"use client";

import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { FilterBar } from "./_components/filter_bar";
import _ from "lodash";
import { useCardStore } from "./stores/card_store";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function App({ cards }: { cards: any }) {
  const merge = useCardStore((state) => state.merge);
  const cardStore = useCardStore((state) => state.cards);

  useEffect(() => {
    merge(cards);
  }, [merge]);

  return (
    <main>
      <Box display="flex" my="3" justifyContent={"center"}>
        <Box display="flex" justifyContent={"center"} width="100%">
          <Image src="./logo.png" alt="Mindbug" width="128px" height="auto" />
        </Box>

        <Box sx={{ ml: "auto", mr: 2 }}>
          <Link
            href="https://github.com/jerome-bienaime/mindbug-cards"
            target="_blank"
          >
            <FaGithub fontSize={"24px"} />
          </Link>
        </Box>
      </Box>
      <FilterBar />
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(8, 1fr)",
          "2xl": "repeat(12, 1fr)",
        }}
        gap={1}
        mx={1}
      >
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
