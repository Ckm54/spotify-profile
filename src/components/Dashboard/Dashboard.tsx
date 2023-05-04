import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import UserTopArtists from "./UserTopArtists";
import UserProfileData from "./UserProfileData";
import UserTopTracks from "./UserTopTracks";
import UserPlaylists from "./UserPlaylists";
import UserFollowing from "./UserFollowing";
import { createBrowserRouter } from "react-router-dom";
import path from "path";
import { useRecoilState, useSetRecoilState } from "recoil";
import { longTermArtistsState } from "../../atom/TopArtistsAtom";
import {
  ArtistsFollowed,
  Playlists,
  TopArtists,
  TopItemsParams,
  UserProfile,
} from "../../../types";
import { useQuery } from "react-query";
import {
  getFollowing,
  getTopArtists,
  getUserPlaylists,
  getUserProfile,
} from "../../api/apiCalls";
import { userProfileState } from "../../atom/UserDataAtom";
import { userFollowedArtistsState } from "../../atom/UserFollowedArtists";
import { userPlaylistsState } from "../../atom/PlaylistsAtom";
import Loader from "../../common/Loader";

type Props = {};

const Dashboard = (props: Props) => {
  // Fetch data needed for dashboard section and store in recoil state

  const setUserProfileState = useSetRecoilState(userProfileState);
  const setArtistsFollowed = useSetRecoilState(userFollowedArtistsState);
  const [userInfo] = useRecoilState(userProfileState);
  const setUserPlaylists = useSetRecoilState(userPlaylistsState);

  const userId = userInfo?.id;

  const { isLoading: userProfileLoading } = useQuery(
    "userProfile",
    () => getUserProfile(),
    {
      onSuccess: async (data: UserProfile) => {
        setUserProfileState(data);
      },
    }
  );

  const { isLoading: followingLoading } = useQuery(
    "getFollowing",
    () => getFollowing(),
    {
      onSuccess: (data: ArtistsFollowed) => {
        setArtistsFollowed(data);
      },
    }
  );

  const { isLoading: playlistsLoading } = useQuery(
    "getPlaylists",
    () => getUserPlaylists(userId),
    {
      onSuccess: (data: Playlists) => {
        setUserPlaylists(data);
      },
      enabled: !!userId,
    }
  );

  const setUserTopArtists = useSetRecoilState(longTermArtistsState);
  const params: TopItemsParams = {
    limit: 30,
    timeRange: "long_term",
  };
  const { isLoading: topArtistsLoading } = useQuery(
    ["getTopArtists", params],
    () => getTopArtists(params),
    {
      onSuccess: (data: TopArtists) => {
        setUserTopArtists(data);
      },
    }
  );

  if (
    topArtistsLoading ||
    playlistsLoading ||
    followingLoading ||
    userProfileLoading
  )
    return <Loader />;
  return (
    <Box maxW={"100vw"}>
      <UserProfileData />
      <Stack position={"relative"}>
        <UserTopArtists />
        <UserTopTracks />
        <Divider pt={4} colorScheme={"twitter"} />
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ md: "space-evenly" }}
        >
          <UserPlaylists />
          <UserFollowing />
        </Flex>
      </Stack>
    </Box>
  );
};

export default Dashboard;
