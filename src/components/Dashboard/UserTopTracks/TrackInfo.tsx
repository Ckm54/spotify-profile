import { Box, Flex, Image, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import { BsFillExplicitFill } from "react-icons/bs";
import { Track } from "../../../../types";
import { formatDurationToMinsAndSecs, formatStringEllipsis } from "../../../utils";
import { useNavigate } from "react-router-dom";

type TrackInfoProps = {
  track: Track;
  index: number;
  isArtistTracks?: boolean;
};

const TrackInfo = ({ track, index, isArtistTracks }: TrackInfoProps) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Box
      transition={'all .2s ease-in'}
      cursor="pointer"
      _hover={{ backgroundColor: "gray.700" }}
      py={2}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex justifyContent={"space-between"} px={{xl: 5}} alignItems="center">
        <Flex flex={1} alignItems="center" gap={2}>
          {isHovering ? (
            <Icon as={TfiInfoAlt} w={5} h={5} />
          ) : (
            <Text fontWeight="600">{index}.</Text>
          )}
          <Image
            src={track.album.images[0]?.url}
            alt={track.name}
            h={10}
            w={10}
          />
          <Box>
            <Text fontSize={{ base: "10pt", xl: "0.975rem" }}>
              {formatStringEllipsis(track.name, 30)}
            </Text>
            <Flex gap={2} alignItems='center'>
              {track.explicit && (
                <Icon
                  as={BsFillExplicitFill}
                  color="gray.500"
                  w="max-content"
                />
              )}
              {track?.artists?.map((artist, index) => {
                const isNotLastTrack =
                  track.artists[track.artists.length - 1].id !== artist.id || index !== 2;
                if (index < 3) return (
                  <Text
                    fontSize={"10pt"}
                    color="gray.400"
                    mr={isNotLastTrack ? "1px" : 0}
                    key={artist.id}
                    _hover={{
                      textDecoration: 'underline',
                      color: '#fff'
                    }}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    {artist.name}
                    {isNotLastTrack && ","}
                  </Text>
                );
              })}
            </Flex>
          </Box>
        </Flex>
        <Text
          display={{ base: "none", xl: "unset" }}
          flex={1}
          justifyContent={"flex-start"}
          fontSize="0.875rem"
          _hover={{ textDecoration: "underline" }}
        >
          {formatStringEllipsis(track.album.name, 20)}
          {
            isArtistTracks && <span style={{marginLeft: '0.7rem'}}>(Track {track.track_number})</span>
          }
        </Text>
        <Text justifyContent={"flex-end"} fontSize={"0.875rem"}>
          {formatDurationToMinsAndSecs(track.duration_ms)}
        </Text>
      </Flex>
    </Box>
  );
};

export default TrackInfo;
