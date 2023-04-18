import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import PlaylistDetailHeader from "./PlaylistDetailHeader";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaylistInfo, getTracksAudioFeatures } from "../../api/apiCalls";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";
import {
  PlaylistInfoType,
  PlaylistTrackType,
  TrackAudioFeaturesType,
} from "../../../types";
import PlaylistTrack from "./PlaylistTrack";
import { TracksAudioFeaturesChart } from "../../common";

type Props = {};

const PlaylistDetailsPage = (props: Props) => {
  const { id } = useParams();
  const [userInfo] = useRecoilState(userProfileState);
  const [trackIds, setTrackIds] = React.useState<string>("");
  const [playlistInfo, setPlaylistInfo] = React.useState<PlaylistInfoType>({
    collaborative: false,
    description: "",
    external_urls: {
      spotify: "",
    },
    followers: {
      total: 0,
      href: null,
    },
    href: "",
    id: "",
    images: [],
    name: "",
    owner: {
      external_urls: {
        spotify: "",
      },
      href: "",
      id: "",
      uri: "",
    },
    primary_color: null,
    public: false,
    snapshot_id: "",
    tracks: {
      href: "",
      items: [],
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
    },
    type: "",
    uri: "",
  });

  const [trackAudioFeatures, setTrackAudioFeatures] =
    React.useState<TrackAudioFeaturesType>({
      audio_features: [],
    });
  const { isLoading: loadingAudioFeatures } = useQuery(
    ["getTrackAudioFeatures", trackIds],
    () => getTracksAudioFeatures(trackIds),
    {
      onSuccess: (data: TrackAudioFeaturesType) => {
        setTrackAudioFeatures(data);
        // const properties = data.audio_features.map((feature: AudioFeature) => Object.keys(feature))
        // setAudioProperties(properties[0])
      },
      enabled: !!trackIds,
    }
  );

  const { isLoading, isRefetching } = useQuery(
    ["getPlaylistInfo", id],
    () => getPlaylistInfo(id!, userInfo.country),
    {
      onSuccess: (data: PlaylistInfoType) => {
        setPlaylistInfo(data);
        const ids: string = data.tracks.items
          .map((track: PlaylistTrackType) => track.track.id)
          .join(",");
        setTrackIds(ids);
      },
      enabled: !!id,
    }
  );

  return (
    <>
      {isLoading || isRefetching || loadingAudioFeatures ? (
        <Text>Loading...</Text>
      ) : (
        <Box maxW={"100%"}>
          <PlaylistDetailHeader playlistInfo={playlistInfo} />
          <Stack
            position={"relative"}
            px={5}
            borderTop={"1px solid"}
            borderTopColor={"brand.600"}
            mt={8}
          >
            <Grid templateColumns={{ lg: "repeat(4, 1fr)" }} gap={4}>
              <GridItem colSpan={1}>
                <Flex py={4} alignItems={"center"} gap={8}>
                  <Text color={"#fff"} fontWeight={600}>
                    Playlist's Audio Features
                  </Text>
                </Flex>
                {trackIds && (
                  <TracksAudioFeaturesChart
                    trackAudioFeatures={trackAudioFeatures}
                  />
                )}
              </GridItem>
              <GridItem
                colSpan={3}
                borderLeft={"1px solid"}
                borderLeftColor={"brand.600"}
                px={4}
              >
                <Flex py={4} alignItems={"center"} gap={8}>
                  <Text color={"#fff"} fontWeight={600}>
                    Tracks on album
                  </Text>
                  <Text color="brand.600">
                    (Total Tracks: {playlistInfo.tracks.total})
                  </Text>
                </Flex>
                <Grid
                  gridTemplateColumns={{
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                >
                  {playlistInfo.tracks.items.map((track: PlaylistTrackType) => (
                    <GridItem key={track.track.id}>
                      <PlaylistTrack track={track} />
                    </GridItem>
                  ))}
                </Grid>
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default PlaylistDetailsPage;
