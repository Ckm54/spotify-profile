import { Box, Flex, Image, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import { Track } from "../../../../types";
import { formatDurationToMinsAndSecs } from "../../../utils";

type TrackInfoProps = {
  track: Track;
  index: number;
};

const TrackInfo = ({ track, index }: TrackInfoProps) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  return (
    <Box
      cursor="pointer"
      _hover={{ backgroundColor: "gray.700" }}
      py={2}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex justifyContent={"space-between"} px={5} alignItems="center">
        <Flex flex={1} alignItems="center" gap={2}>
          {isHovering ? <Icon as={TfiInfoAlt} w={5} h={5} /> : <Text fontWeight="600">{index}.</Text>}
          <Image
            src={track.album.images[0]?.url}
            h={10}
            w={10}
            alt={track.name}
          />
          <Box>
            <Text fontSize={{base: '10pt', md: '0.975rem'}}>{track.name}</Text>
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
        <Text display={{ base: 'none', md: 'unset'}} flex={1} justifyContent={"flex-start"} fontSize='0.875rem' _hover={{ textDecoration: 'underline'}}>
          {track.album.name}
        </Text>
        <Text justifyContent={"flex-end"} fontSize={'0.875rem'}>
          {formatDurationToMinsAndSecs(track.duration_ms)}
        </Text>
      </Flex>
    </Box>
  );
};

export default TrackInfo;
