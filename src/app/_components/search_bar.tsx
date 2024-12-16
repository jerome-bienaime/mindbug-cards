import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { type ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { api } from "~/trpc/react";
import { useCardStore } from "../stores/card_store";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const merge = useCardStore((state) => state.merge);
  const searchQuery = api.card.search.useQuery({
    query,
  });

  function handleSearchText(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setQuery(value);
  }

  useEffect(() => {
    if (searchQuery.data) {
      merge(searchQuery.data, "search");
    }
  }, [searchQuery.isSuccess, searchQuery.data, merge]);

  return (
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
        placeholder="Search for a creature name, ability…"
        onChange={handleSearchText}
      ></Input>
    </InputGroup>
  );
}
