import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { RecentPlays, RecentTrack } from "../../../types";
import { getRecentlyPlayedTracks } from "../../api/apiCalls";
import { recentlyPlayedTracksState } from "../../atom/TopTracksAtom";
import TrackInfo from "../Dashboard/UserTopTracks/TrackInfo";

type Props = {};

const MyRecentPlays = (props: Props) => {
  const [recentTracks, setRecentTracks] = useRecoilState(
    recentlyPlayedTracksState
  );

  const { isLoading } = useQuery(
    "getRecentPlays",
    () => getRecentlyPlayedTracks(),
    {
      onSuccess: (data: RecentPlays) => {
        setRecentTracks(data);
      },
    }
  );
  return (
    <Box px={8}>
      <Text py={4} fontWeight={600}>
        Recently Played Tracks
      </Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        recentTracks.items.map((track: RecentTrack, index: number) => (
          <TrackInfo track={track.track} index={index + 1} />
        ))
      )}
    </Box>
  );
};

export default MyRecentPlays;
