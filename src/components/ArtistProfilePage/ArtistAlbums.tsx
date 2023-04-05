import React from "react";
import { getArtistAlbums } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Album, ArtistAlbumsType } from "../../../types";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import AlbumCard from "../../common/AlbumCard";

type Props = {};

const ArtistAlbums = (props: Props) => {
  const { id } = useParams();
  const [artistAlbums, setArtistAlbums] = React.useState<ArtistAlbumsType>();

  const { isLoading } = useQuery(
    ["getArtistAlbums", id],
    () => getArtistAlbums(id!, "album"),
    {
      onSuccess: (data: ArtistAlbumsType) => {
        setArtistAlbums(data);
      },
      enabled: !!id,
    }
  );
  return (
    <>
      {artistAlbums?.total === 0 ? (
        <React.Fragment />
      ) : (
        <Box maxW={{xl: "70%"}}>
          <Flex justifyContent={"space-between"} alignItems="center" px={5}>
            <Text color={"#fff"} fontWeight={600} mb={8} mt={{xl: 4}}>
              Top Albums
            </Text>
            <Text
              color="brand.600"
            >
              Total: ({artistAlbums?.total})
            </Text>
          </Flex>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Grid templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(6, 1fr)'}}>
              {artistAlbums?.items.map((album: Album, index: number) => (
                index < 6 && <AlbumCard albumInfo={album} key={album.id} />
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default ArtistAlbums;
