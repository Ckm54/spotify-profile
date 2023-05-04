import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
