import { Stack } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ArtistsFollowed, UserProfile } from "../../types";
import { getFollowing, getTopArtists, getUserProfile } from "../api/apiCalls";
import { userProfileState } from "../atom/UserDataAtom";
import { userFollowedArtistsState } from "../atom/UserFollowedArtists";
import { Dashboard, MyPlaylists, MyRecentPlays, MyTopArtists, MyTopTracks, NavBar } from "../components";
import Layout from "../components/Layout/Layout";
import ErrorPage from "./ErrorPage";

type Props = {};

const Home = (props: Props) => {
  const setUserProfileState = useSetRecoilState(userProfileState);
  const setArtistsFollowed = useSetRecoilState(userFollowedArtistsState);

  const {} = useQuery("userProfile", () => getUserProfile(), {
    onSuccess: async (data: UserProfile) => {
      setUserProfileState(data);
    },
  });

  const {} = useQuery("getFollowing", () => getFollowing(), {
    onSuccess: (data: ArtistsFollowed) => {
      setArtistsFollowed(data);
    },
  });

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Layout errorElement={<ErrorPage />} />,
      children: [
        {
          path: '',
          index: true,
          element: <Dashboard />,
          errorElement: <ErrorPage />
        },
        {
          path: 'top-artists',
          element: <MyTopArtists />
        },
        {
          path: 'top-tracks',
          element: <MyTopTracks />
        },
        {
          path: 'playlists',
          element: <MyPlaylists />
        },
        {
          path: 'recently-played',
          element: <MyRecentPlays />
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Home;
