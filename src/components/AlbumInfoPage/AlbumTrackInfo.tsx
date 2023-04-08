import React from "react";
import { AlbumTracks, Item } from "../../../types";
import { Box, Text } from "@chakra-ui/react";
import AlbumTrack from "./AlbumTrack";

type AlbumTrackInfoProps = {
  albumTracks: AlbumTracks;
};

const AlbumTrackInfo = ({ albumTracks }: AlbumTrackInfoProps) => {
  return (
    <Box mx={4}>
      <Text color={"#fff"} fontWeight={600} py={4}>
        Tracks on album ({albumTracks.total})
      </Text>
      {albumTracks.items.map((track: Item, index: number) => (
        <AlbumTrack track={track} index={index + 1} key={track.id} />
      ))}
    </Box>
  );
};

export default AlbumTrackInfo;
