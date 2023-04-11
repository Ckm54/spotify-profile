import React from "react";
import { AlbumInfoType, Artist, Copyright } from "../../../types";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";

type AlbumInfoHeaderProps = {
  albumInfo: AlbumInfoType;
};

const fac = new FastAverageColor();

const AlbumInfoHeader = ({ albumInfo }: AlbumInfoHeaderProps) => {
  const [dominantColor, setDominantColor] = React.useState<
    string | undefined
  >();

  const getColor = async () => {
    if (albumInfo.images[0]?.url) {
      try {
        const response = await fac.getColorAsync(albumInfo.images[0].url);
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

  return (
    <Box>
      <Stack position={"relative"}>
        <Box
          bgGradient={`linear(to-b, ${dominantColor}, transparent)`}
          backgroundRepeat="no-repeat"
          position="absolute"
          minWidth="100%"
          minH={"60vh"}
        />
        <Flex
          gap={4}
          pt={10}
          px={5}
          position="relative"
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          overflowX={"hidden"}
        >
          <Image
            src={albumInfo.images[0]?.url}
            alt={albumInfo.name}
            h={72}
            w={72}
            objectFit="cover"
          />
          <Flex gap={4}>
            <Box>
              <Text fontSize={"10pt"} fontWeight={600}>
                {albumInfo.album_type}
              </Text>
              <Text
                fontSize={{ base: "2xl", md: "4xl", xl: "5xl" }}
                fontWeight={600}
              >
                {albumInfo.name}
              </Text>
              <Stack mb={4}>
                {albumInfo.artists.map((artist: Artist) => (
                  <Text fontWeight={"semibold"}>{artist.name}</Text>
                ))}
                <Text>{albumInfo.total_tracks} Tracks</Text>
                <Flex alignItems={"center"} gap={2}>
                  <Box h={2} w={2} bg="brand.900" borderRadius={"50%"} />
                  <Text fontSize={"10pt"} fontWeight={600}>
                    {new Date(albumInfo.release_date).toLocaleDateString()}
                  </Text>
                </Flex>
                <Stack fontSize={"10pt"} color="brand.600">
                  {albumInfo.copyrights &&
                    albumInfo.copyrights.map((copyright: Copyright) => (
                      <Text>{copyright.text}</Text>
                    ))}
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AlbumInfoHeader;
