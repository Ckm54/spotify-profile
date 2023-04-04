import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import ArtistProfileSection from "./ArtistProfileSection";
import ArtistTopTracks from "./ArtistTopTracks";

type Props = {};

const ArtistProfilePage = (props: Props) => {
  return (
    <Box maxW={"100vw"}>
      <ArtistProfileSection />
      <Stack position={"relative"} mt={8}>
        <ArtistTopTracks />
      </Stack>
    </Box>
  );
};

export default ArtistProfilePage;
