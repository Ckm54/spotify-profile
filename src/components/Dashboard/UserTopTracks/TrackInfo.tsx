import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Track } from "../../../../types";
import { formatDurationToMinsAndSecs } from "../../../utils";

type TrackInfoProps = {
  track: Track;
  index: number
};

const TrackInfo = ({ track, index }: TrackInfoProps) => {
  return (
    <Box cursor='pointer' _hover={{backgroundColor: "gray.800"}} py={2}>
      <Flex justifyContent={"space-between"} px={5} alignItems='center'>
        <Flex flex={1} alignItems='center' gap={2}>
          <Text fontWeight='600'>{index}.</Text>
          <Image
            src={track.album.images[0]?.url}
            h={10}
            w={10}
            alt={track.name}
          />
          <Box>
            <Text>{track.name}</Text>
            <Flex gap={2}>
              {track.explicit && (
                <Text
                  bg="gray.500"
                  color="brand.700"
                  w="max-content"
                  px={1}
                  fontSize="8pt"
                  borderRadius={2}
                >
                  E
                </Text>
              )}
              {track?.artists?.map((artist) => {
                const isNotLastTrack =
                  track.artists[track.artists.length - 1].id !== artist.id;
                return (
                  <Text
                    fontSize={"10pt"}
                    color="gray.400"
                    mr={isNotLastTrack ? "2" : 0}
                    key={artist.id}
                  >
                    {artist.name}
                    {isNotLastTrack && ","}
                  </Text>
                );
              })}
            </Flex>
          </Box>
        </Flex>
        <Text flex={1} justifyContent={'flex-start'}>{track.album.name}</Text>
        <Text  justifyContent={'flex-end'}>{formatDurationToMinsAndSecs(track.duration_ms)}</Text>
      </Flex>
    </Box>
  );
};

export default TrackInfo;
