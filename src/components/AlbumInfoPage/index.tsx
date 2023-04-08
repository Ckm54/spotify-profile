import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAlbumInfo } from "../../api/apiCalls";
import { AlbumInfoType } from "../../../types";
import { Box, Stack, Text } from "@chakra-ui/react";
import AlbumInfoHeader from "./AlbumInfoHeader";
import AlbumTrackInfo from "./AlbumTrackInfo";

type Props = {};

const AlbumInfoPage = (props: Props) => {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = React.useState<AlbumInfoType>({
    album_group: "",
    album_type: "",
    artists: [],
    available_markets: [],
    copyrights: [],
    external_ids: { upc: "" },
    external_urls: { spotify: "" },
    genres: [],
    href: "",
    id: "",
    images: [],
    label: "",
    name: "",
    popularity: 0,
    release_date: new Date(),
    release_date_precision: "",
    total_tracks: 0,
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

  const { isLoading } = useQuery(
    ["getTrackDetails", id],
    () => getAlbumInfo(id!),
    {
      onSuccess: (data: AlbumInfoType) => {
        setAlbumInfo(data);
      },
      enabled: !!id,
    }
  );

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Box maxW={"100%"}>
          <AlbumInfoHeader albumInfo={albumInfo} />
          <Stack position={'relative'}>
            <AlbumTrackInfo albumTracks={albumInfo.tracks} />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default AlbumInfoPage;
