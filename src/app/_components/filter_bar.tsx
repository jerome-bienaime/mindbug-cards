"use client";
import { Box, Stack, Grid, GridItem } from "@chakra-ui/react";

import { PoolSelect } from "./pool_select";
import { KeywordSelect } from "./keyword_select";
import { PackSelect } from "./pack_select";
import { PowerRangeSlider } from "./power_range_slider";
import { TriggerSelect } from "./trigger_select";
import { SearchBar } from "./search_bar";

export function FilterBar() {
  return (
    <Box position="sticky" top="2" left="0" right="0" m={4}>
      <Box rounded="md" bg="rgba(0,0,0,0.6)" px="2" py="2" width="100%">
        <Stack spacing={8} mb="0">
          <SearchBar />
        </Stack>
        <Box display="flex" flexDirection="row" alignItems={"center"} gap="8">
          <Grid
            templateColumns={{
              base: "repeat(5, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(6, 1fr)",
              "2xl": "repeat(10, 1fr)",
            }}
            gap={6}
            px={4}
            mt={2}
          >
            <GridItem colSpan={{ base: 5, md: 2 }}>
              <PowerRangeSlider />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 1 }}>
              <PoolSelect />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 3 }}>
              <PackSelect />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 2 }}>
              <KeywordSelect />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 2 }}>
              <TriggerSelect />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
