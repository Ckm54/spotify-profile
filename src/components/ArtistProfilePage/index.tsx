import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ArtistProfile } from "../../../types";
import { getArtistProfile } from "../../api/apiCalls";

type Props = {};

const fac = new FastAverageColor();

const ArtistProfilePage = (props: Props) => {
  const [artistProfile, setArtistProfile] = React.useState<ArtistProfile>({
    name: "",
    external_urls: {
      spotify: "",
    },
    followers: {
      href: null,
      total: 0,
    },
    genres: [],
    id: "",
    href: "",
    images: [],
    popularity: 0,
    type: "",
    uri: "",
  });
  const { id } = useParams();
  const [dominantColor, setDominantColor] = React.useState<
    string | undefined
  >();

  const getColor = async () => {
    if (artistProfile.images[0]?.url) {
      try {
        const response = await fac.getColorAsync(artistProfile.images[0].url);
        if (response) {
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getColor().then((color) => setDominantColor(color?.rgb));
  }, [getColor]);

  const { isLoading } = useQuery(
    "getArtist",
    () => getArtistProfile(id!),
    {
      enabled: !!id,
      onSuccess: (data: ArtistProfile) => setArtistProfile(data),
    }
  );

  return (
    <Box>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack position={"relative"}>
          <Box
            bgGradient={`linear(to-b, ${dominantColor}, transparent)`}
            backgroundRepeat="no-repeat"
            position="absolute"
            minWidth="100%"
            minH={"50vh"}
          />
          <Flex
            gap={4}
            pt={10}
            px={5}
            position="relative"
            alignItems={"center"}
          >
            <Image src={artistProfile.images[0]?.url} h={52} w={52} />
            <Flex gap={4}>
              <Stack>
                <Text fontSize={"10pt"} fontWeight={600}>
                  {artistProfile.type}
                </Text>
                <Text fontSize={"5xl"} fontWeight={600}>
                  {artistProfile.name}
                </Text>
                <Flex alignItems={"center"} gap={2}>
                  <Text>
                    {artistProfile.followers.total.toLocaleString()} Followers
                  </Text>
                  <Box h={2} w={2} bg="#fff" borderRadius={"50%"} />
                  <Text>{artistProfile.popularity}% popularity</Text>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default ArtistProfilePage;
