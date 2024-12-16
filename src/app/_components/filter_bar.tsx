"use client";
import {
  Box,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { PoolSelect } from "./pool_select";
import { KeywordSelect } from "./keyword_select";
import { PackSelect } from "./pack_select";
import { PowerRangeSlider } from "./power_range_slider";
import { TriggerSelect } from "./trigger_select";

export function FilterBar() {
  return (
    <Box
      position="sticky"
      top="2"
      left="0"
      right="0"
      m={4}
    >
      <Box rounded="md" bg="rgba(0,0,0,0.6)" px="2" py="2" width="100%">
        <Stack spacing={8} mb="0">
          <InputGroup borderWidth="1px" rounded="2px" borderStyle="solid">
            <InputLeftElement
              color="pink.200"
              pointerEvents="none"
              fontSize="xl"
              bg="transparent"
            >
              <IoIosSearch color="pink.700" />
            </InputLeftElement>
            <Input
              variant="outlined"
              size="md"
              pl="8"
              type="text"
              color="pink.200"
              bg="rgba(0,0,0,0.4)"
              placeholder="search for a creature name, id, ability…"
            ></Input>
          </InputGroup>
        </Stack>
        <Box display="flex" flexDirection="row" alignItems={"center"} gap="8">
          <Grid templateColumns="repeat(10,1fr)" gap={6} px={4} mt={2}>
            <GridItem colSpan={2}>
              <PowerRangeSlider />
            </GridItem>
            <GridItem colSpan={1}>
              <PoolSelect />
            </GridItem>
            <GridItem colSpan={3}>
              <PackSelect />
            </GridItem>
            <GridItem colSpan={2}>
              <KeywordSelect />
            </GridItem>
            <GridItem colSpan={2}>
              <TriggerSelect />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
