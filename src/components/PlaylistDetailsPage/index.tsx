import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import PlaylistDetailHeader from "./PlaylistDetailHeader";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaylistInfo } from "../../api/apiCalls";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";
import { PlaylistInfoType, PlaylistTrackType } from "../../../types";
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
      {isLoading || isRefetching ? (
        <Text>Loading...</Text>
      ) : (
        <Box maxW={"100%"}>
          <PlaylistDetailHeader playlistInfo={playlistInfo} />
          <Stack position={"relative"} px={5}>
            <Flex py={4} alignItems={"center"} gap={8}>
              <Text color={"#fff"} fontWeight={600}>
                Tracks on album
              </Text>
              <Text color="brand.600">
                (Total Tracks: {playlistInfo.tracks.total})
              </Text>
            </Flex>

            {trackIds && <TracksAudioFeaturesChart trackIds={trackIds} />}
            <Grid
              gridTemplateColumns={{
                lg: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
            >
              {playlistInfo.tracks.items.map((track: PlaylistTrackType) => (
                <GridItem key={track.track.id} mx={{ lg: 4 }}>
                  <PlaylistTrack track={track} />
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default PlaylistDetailsPage;
