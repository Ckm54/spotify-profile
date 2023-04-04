import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
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
      <Text py={4} fontWeight={600}>
        My Playlists
      </Text>

      <Grid templateColumns={'repeat(5, 1fr)'} gridGap={6}>
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
