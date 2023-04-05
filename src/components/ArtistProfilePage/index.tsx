import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import ArtistProfileSection from "./ArtistProfileSection";
import ArtistTopTracks from "./ArtistTopTracks";
import ArtistAlbums from "./ArtistAlbums";
import RelatedArtists from "./RelatedArtists";
import { useLocation } from "react-router-dom";

type Props = {};

const ArtistProfilePage = (props: Props) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box maxW={"100vw"}>
      <ArtistProfileSection />
      <Stack position={"relative"} mt={8}>
        <ArtistTopTracks />
        <ArtistAlbums />
        <RelatedArtists />
      </Stack>
    </Box>
  );
};

export default ArtistProfilePage;
