"use client";

import {
  RangeSlider,
  RangeSliderMark,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Text,
} from "@chakra-ui/react";
import { api } from "~/trpc/react";
import { useCardStore } from "../stores/card_store";
import { useEffect } from "react";

export function PowerRangeSlider() {
  const sliderValue = useCardStore((state) => state.options.power);
  const merge = useCardStore((state) => state.merge);
  const setSliderValue = (value: [number, number]) =>
    useCardStore.setState((state) => ({
      ...state,
      options: { ...state.options, power: value },
    }));

  const cardQuery = api.card.getByPowerRange.useQuery(sliderValue);

  useEffect(() => {
    if (cardQuery.isSuccess) {
      merge(cardQuery.data, "power");
    }
  }, [cardQuery.isSuccess, cardQuery.data, merge]);

  const handleSliderChange = (val: [number, number]) => {
    setSliderValue(val);
  };

  const markers = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <Box px="2" pb="4">
      <Box textAlign={"center"} h={8}>
        <Text fontSize="lg" as="b" color="pink.200">
          Power
        </Text>
      </Box>

      <RangeSlider
        step={1}
        defaultValue={[1, 10]}
        min={1}
        max={10}
        onChange={handleSliderChange}
      >
        {markers.map((marker) => (
          <RangeSliderMark
            value={marker}
            mt="2"
            ml="-1"
            fontSize="sm"
            key={marker}
          >
            {marker}
          </RangeSliderMark>
        ))}
        <RangeSliderTrack bg="pink.100">
          <RangeSliderFilledTrack bg="pink.500" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={4} index={0} bg="pink.100" />
        <RangeSliderThumb boxSize={4} index={1} bg="pink.100" />
      </RangeSlider>
    </Box>
  );
}
