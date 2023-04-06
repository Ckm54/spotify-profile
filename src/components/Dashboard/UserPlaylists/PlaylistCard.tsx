import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Playlist } from "../../../../types";
import { useNavigate } from "react-router-dom";

type PlaylistCardProps = {
  playlist: Playlist;
  detailed: boolean;
};

const PlaylistCard = ({ playlist, detailed }: PlaylistCardProps) => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent={"center"}
      cursor="pointer"
      p={4}
      borderRadius={10}
      bg="gray.800"
      transition={"all 0.32s ease"}
      _hover={{ bg: "gray.900" }}
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <Image
        src={playlist.images[0]?.url}
        alt={playlist.name}
        h={{base: 40, lg: 42, xl: detailed ? "250" : "200"}}
        w={{base: '100%', md:  detailed ? "250" : "100%"}}
        objectFit="cover"
      />
      <Stack justifyContent={"flex-start"}>
        <Text fontSize={"11pt"} mt={2}>
          {playlist.name}
        </Text>
        <Text fontWeight={"light semibold"} color="brand.600" fontSize="10pt">
          {playlist.tracks.total} TRACKS
        </Text>
        <Text fontSize={"10pt"}>
          Created By:{" "}
          <span style={{ fontWeight: "bold" }}>
            {playlist.owner.display_name}
          </span>
        </Text>
      </Stack>
    </Stack>
  );
};

export default PlaylistCard;
