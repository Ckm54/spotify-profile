import { useQuery } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ArtistsFollowed, Playlists, UserProfile } from "../../types";
import {
  getFollowing,
  getUserPlaylists,
  getUserProfile,
} from "../api/apiCalls";
import { userPlaylistsState } from "../atom/PlaylistsAtom";
import { userProfileState } from "../atom/UserDataAtom";
import { userFollowedArtistsState } from "../atom/UserFollowedArtists";
import {
  AlbumInfoPage,
  ArtistProfilePage,
  Dashboard,
  MyPlaylists,
  MyRecentPlays,
  MyTopArtists,
  MyTopTracks,
  PlaylistDetailsPage,
  TrackDetailsPage,
} from "../components";
import Layout from "../components/Layout/Layout";
import ErrorPage from "./ErrorPage";

type Props = {};

const Home = (props: Props) => {
  const setUserProfileState = useSetRecoilState(userProfileState);
  const setArtistsFollowed = useSetRecoilState(userFollowedArtistsState);
  const [userInfo] = useRecoilState(userProfileState);
  const setUserPlaylists = useSetRecoilState(userPlaylistsState);

  const userId = userInfo?.id;

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

  const { isLoading } = useQuery(
    "getPlaylists",
    () => getUserPlaylists(userId),
    {
      onSuccess: (data: Playlists) => {
        setUserPlaylists(data);
      },
      enabled: !!userId,
    }
  );

  // React.useEffect(() => {
  //   if(userInfo.id !== '') {
  //     queryClient.refetchQueries({ queryKey: ['getPlaylists']})
  //   }
  // }, [userInfo]);

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Layout errorElement={<ErrorPage />} />,
      children: [
        {
          path: "",
          index: true,
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "top-artists",
          element: <MyTopArtists />,
        },
        {
          path: "top-tracks",
          element: <MyTopTracks />,
        },
        {
          path: "playlists",
          element: <MyPlaylists />,
        },
        {
          path: "recently-played",
          element: <MyRecentPlays />,
        },
        {
          path: "artist/:id",
          element: <ArtistProfilePage />,
        },
        {
          path: "playlist/:id",
          element: <PlaylistDetailsPage />,
        },
        {
          path: "album/:id",
          element: <AlbumInfoPage />,
        },
        {
          path: "track/:id",
          element: <TrackDetailsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Home;
