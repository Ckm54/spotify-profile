import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Playlist, Playlists } from "../../../../types";
import { getUserPlaylists } from "../../../api/apiCalls";
import { userPlaylistsState } from "../../../atom/PlaylistsAtom";
import { userProfileState } from "../../../atom/UserDataAtom";
import PlaylistCard from "./PlaylistCard";

type Props = {};

const UserPlaylists = (props: Props) => {
  const [userPlaylists] = useRecoilState(userPlaylistsState);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if(userInfo.id !== '') {
  //     queryClient.refetchQueries({ queryKey: ['getPlaylists']})
  //   }
  // }, [userInfo]);

  return (
    <Box flex={1} px={{base: 4, md: 0}}>
      <Flex
        my={8}
        justifyContent={"space-between"}
        alignItems="center"
        pl={{ md: 5 }}
        pr={{ md: 8 }}
      >
        <Text color={"#fff"} fontWeight={600}>
          Playlists
        </Text>
        <Text color="brand.600" cursor="pointer" _hover={{ color: "#fff" }} onClick={() => navigate('/playlists')}>
          View all
        </Text>
      </Flex>

      <Flex flexWrap={'wrap'} gap={{base: 4, md: 12}} justifyContent={{base: 'space-between', md: 'unset'}} >
        {userPlaylists?.items.map(
          (playlist: Playlist, index: number) =>
            index < 5 && <PlaylistCard playlist={playlist} key={playlist.id} detailed={false} />
        )}
      </Flex>
    </Box>
  );
};

export default UserPlaylists;
