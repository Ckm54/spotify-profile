import React from "react";
import { PlaylistTrackType } from "../../../types";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { formatDurationToMinsAndSecs, formatStringEllipsis } from "../../utils";
import { BsFillExplicitFill } from "react-icons/bs";
import { MONTH_NAMES_SHORT } from "../../constants";
import { useNavigate } from "react-router-dom";

type PlaylistTrackProps = {
  track: PlaylistTrackType;
};

const PlaylistTrack = ({ track }: PlaylistTrackProps) => {

  const navigate = useNavigate();

  return (
    <Box py={2} px={{ lg: 4 }} transition={'all .3s ease'} cursor={'pointer'} borderRadius={5} _hover={{backgroundColor: 'blackAlpha.400'}}>
      <Flex gap={{base: 3, md: 4}}>
        <Image
          src={track.track.album.images[0]?.url}
          alt={track.track.name}
          height={20}
          width={20}
          objectFit={"cover"}
        />
        <Box w={"100%"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text display={{base: 'none', md: 'undet'}} fontSize={{base: '12pt'}} _hover={{textDecoration: 'underline'}} onClick={() => navigate(`/track/${track.track.id}`)}>{formatStringEllipsis(track.track.name, 40)}</Text>
            <Text display={{base: 'block', md: 'none'}} fontSize={{base: '11pt'}}>{formatStringEllipsis(track.track.name, 20)}</Text>
            <Text fontSize={'10pt'} color={"brand.600"}>
              {formatDurationToMinsAndSecs(track.track.duration_ms)}
            </Text>
          </Flex>
          <Flex>
            {track.track.explicit && (
              <Icon as={BsFillExplicitFill} color="gray.500" w="max-content" />
            )}
          </Flex>
          <Text fontSize={'10pt'}>
            {new Date(track.added_at).getFullYear().toString() +
              " " +
              MONTH_NAMES_SHORT[new Date(track.added_at).getMonth()] +
              " " +
              new Date(track.added_at).getDay()}
          </Text>
          <Text cursor='pointer' color='brand.600' _hover={{textDecoration: 'underline'}} onClick={() => navigate(`/artist/${track.track.artists[0].id}`)}>{track.track.artists[0]?.name}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlaylistTrack;
