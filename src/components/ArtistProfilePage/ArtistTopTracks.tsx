import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ArtistTopTracksType, Track } from "../../../types";
import { getArtistTopTracks } from "../../api/apiCalls";
import { artistNameState } from "../../atom/artistInfoAtom";
import { userProfileState } from "../../atom/UserDataAtom";
import TrackInfo from "../Dashboard/UserTopTracks/TrackInfo";

type Props = {};

const ArtistTopTracks = (props: Props) => {
  const [artistName] = useRecoilState(artistNameState);
  const [userData] = useRecoilState(userProfileState);
  const [artistTopTracks, setArtistTopTracks] =
    React.useState<ArtistTopTracksType>();

  const { id } = useParams();

  const { isLoading } = useQuery(
    ["getArtistTopTracks", id, userData.country],
    () => getArtistTopTracks(id!, userData.country),
    {
      onSuccess: (data: ArtistTopTracksType) => {
        setArtistTopTracks(data);
      },
      enabled: !!id,
    }
  );
  return (
    <Box bg={"blackAlpha.100"} px={4}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : artistTopTracks?.tracks.length === 0 ? (
        <Box>
          <Text>Sorry artist profile info is unavailable!</Text>
        </Box>
      ) : (
        <Box maxW={{xl: "70%"}} >
          <Text color={"#fff"} fontWeight={600} py={4}>
            {artistName}
            {artistName.split("")[artistName.length - 1] !== "s"
              ? "'s"
              : "'"}{" "}
            Top 5 Tracks
          </Text>
          {artistTopTracks?.tracks.map(
            (track: Track, index: number) =>
              index < 5 && (
                <TrackInfo key={track.id} track={track} index={index + 1} isArtistTracks />
              )
          )}
        </Box>
      )}
    </Box>
  );
};

export default ArtistTopTracks;
