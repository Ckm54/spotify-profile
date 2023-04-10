import React from "react";
import { Artist, Item } from "../../../types";
import { Box, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { BsFillExplicitFill } from "react-icons/bs";
import { formatDurationToMinsAndSecs } from "../../utils";
import { useNavigate } from "react-router-dom";

type AlbumTrackProps = {
  track: Item;
  index: number;
};

const AlbumTrack = ({ track, index }: AlbumTrackProps) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Flex
      cursor={"pointer"}
      gap={4}
      alignItems={"center"}
      py={2}
      px={5}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      _hover={{
        bg: "blackAlpha.400",
      }}
    >
      {isHovering ? (
        <Icon as={FaInfoCircle} w={5} h={5} />
      ) : (
        <Text fontWeight="600">{index}.</Text>
      )}
      <Box width={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Text _hover={{textDecoration: 'underline'}} onClick={() => navigate(`/track/${track.id}`)}>{track.name}</Text>
          <Text color="brand.600">
            {formatDurationToMinsAndSecs(track.duration_ms)}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          {track.explicit && (
            <Icon as={BsFillExplicitFill} color="gray.500" w="max-content" />
          )}

          <Flex gap={1}>
            {track.artists.map((artist: Artist) => (
              <Text
                key={artist.id}
                fontSize={"10pt"}
                color="brand.600"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                {artist.name}
                {track.artists.indexOf(artist) !== track.artists.length - 1 &&
                  ","}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AlbumTrack;
