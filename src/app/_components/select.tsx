"use client";
import {
  Box,
  VStack,
  HStack,
  Badge,
  Button,
  Text,
  Select as CSelect,
} from "@chakra-ui/react";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export function Select({
  selection,
  choice,
  handleSelect,
  handleRemove,
  title,
  data,
}: {
  selection: Set<string> | string[];
  handleSelect: (s: string) => void;
  handleRemove: (s: string) => void;
  choice: Set<string>;
  title: string;
  data: string[];
}) {
  return (
    <Box px="2">
      <Box textAlign={"center"} h={8}>
        <Text fontSize="lg" as="b" color="pink.200">
          {title}
        </Text>
      </Box>
      <VStack gap={1}>
        {Array.from(selection).length !== data.length && (
          <CSelect
            placeholder={`Choose a ${title}…`}
            size="sm"
            onChange={(e) => handleSelect(e.target.value)}
          >
            {Array.from(choice).map((keyword: string) => {
              return (
                <option value={`${keyword}`} key={keyword}>
                  {keyword}
                </option>
              );
            })}
          </CSelect>
        )}
        <HStack
          flexWrap={"wrap"}
          px={1}
          maxHeight={
            Array.from(selection).length !== data.length ? "30px" : "70px"
          }
          height="70px"
          overflowY={"scroll"}
          gridRowGap={1}
        >
          {Array.from(selection).length > 0 &&
            Array.from(selection).map((select) => {
              return (
                <Badge key={select}>
                  {select}
                  <Button
                    size="6px"
                    variant="ghost"
                    onClick={() => handleRemove(select)}
                  >
                    <RxCross2 />
                  </Button>
                </Badge>
              );
            })}
        </HStack>
      </VStack>
    </Box>
  );
}
