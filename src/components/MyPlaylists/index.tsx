import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { Playlist } from "../../../types";
import { userPlaylistsState } from "../../atom/PlaylistsAtom";
import PlaylistCard from "../Dashboard/UserPlaylists/PlaylistCard";

type Props = {};

const MyPlaylists = (props: Props) => {
  const [userPlaylists] = useRecoilState(userPlaylistsState);

  return (
    <Box px={4}>
      <Flex py={4} gap={4}>
        <Text fontWeight={600}>My Playlists</Text>
        <Text color="brand.600">Total: ({userPlaylists.total})</Text>
      </Flex>

      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(5, 1fr)" }}
        gridGap={6}
      >
        {userPlaylists.items.map((playlist: Playlist) => (
          <GridItem key={playlist.id}>
            <PlaylistCard playlist={playlist} detailed={true} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPlaylists;
