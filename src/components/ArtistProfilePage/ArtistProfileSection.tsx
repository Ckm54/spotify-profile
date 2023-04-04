import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ArtistProfile } from "../../../types";
import { getArtistProfile, getIsFollowing } from "../../api/apiCalls";

type Props = {};

const fac = new FastAverageColor();

const ArtistProfileSection = (props: Props) => {
  const [isFollowing, setIsFollowing] = React.useState<boolean>(true);
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

  const { isLoading } = useQuery("getArtist", () => getArtistProfile(id!), {
    enabled: !!id,
    onSuccess: (data: ArtistProfile) => setArtistProfile(data),
  });

  const {} = useQuery(
    "getIsFollowing",
    () => getIsFollowing(artistProfile.id),
    {
      onSuccess: (data) => {
        setIsFollowing(data[0]);
      },
      enabled: !!artistProfile.id,
    }
  );

  return (
    <Box>
      {isLoading && !artistProfile.name ? (
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
            <Image
              src={artistProfile.images[0]?.url}
              h={52}
              w={52}
              objectFit="cover"
            />
            <Flex gap={4}>
              <Box>
                <Text fontSize={"10pt"} fontWeight={600}>
                  {artistProfile.type}
                </Text>
                <Text fontSize={"5xl"} fontWeight={600}>
                  {artistProfile.name}
                </Text>
                <Stack mb={4}>
                  <Flex alignItems={"center"}>
                    <Text fontSize={"10pt"} fontWeight="semibold" mr={2}>
                      Genres:
                    </Text>
                    {artistProfile.genres.map(
                      (genre: string, index: number) => (
                        <Text
                          color="brand.600"
                          mr={index + 2 !== genre.length ? 1 : 0}
                          key={index}
                        >
                          {genre}
                          {index + 2 !== genre.length && ","}
                        </Text>
                      )
                    )}
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <Text>
                      {artistProfile.followers.total.toLocaleString()} Followers
                    </Text>
                    <Box h={2} w={2} bg="#fff" borderRadius={"50%"} />
                    <Text>{artistProfile.popularity}% popularity</Text>
                  </Flex>
                </Stack>
                <Button
                  maxW={"max-content"}
                  fontSize="0.925rem"
                  borderRadius={5}
                  borderWidth={1}
                  px={4}
                  bg="transparent"
                  // fontWeight={600}
                  borderColor="brand.500"
                  transition={"all .2s ease"}
                  _hover={{
                    backgroundColor: "transparent",
                    borderColor: "brand.900",
                  }}
                >
                  {!isFollowing ? "Follow" : "Following"}
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default ArtistProfileSection;
