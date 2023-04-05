import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import PlaylistDetailHeader from "./PlaylistDetailHeader";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaylistInfo } from "../../api/apiCalls";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";
import { PlaylistInfoType, PlaylistTrackType } from "../../../types";
import PlaylistTrack from "./PlaylistTrack";

type Props = {};

const PlaylistDetailsPage = (props: Props) => {
  const { id } = useParams();
  const [userInfo] = useRecoilState(userProfileState);
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

  const {} = useQuery(
    ["getPlaylistInfo", id],
    () => getPlaylistInfo(id!, userInfo.country),
    {
      onSuccess: (data: PlaylistInfoType) => {
        setPlaylistInfo(data);
      },
      enabled: !!id,
    }
  );
  return (
    <Box maxW={"100%"}>
      <PlaylistDetailHeader playlistInfo={playlistInfo} />
      <Stack position={"relative"}>
        <Flex py={4} alignItems={'center'} gap={8}>
          <Text color={"#fff"} fontWeight={600}>
            Tracks on album
          </Text>
          <Text color='brand.600'>(Total Tracks: {playlistInfo.tracks.total})</Text>
        </Flex>
        {playlistInfo.tracks.items.map((track: PlaylistTrackType) => (
          <PlaylistTrack track={track} />
        ))}
      </Stack>
    </Box>
  );
};

export default PlaylistDetailsPage;
