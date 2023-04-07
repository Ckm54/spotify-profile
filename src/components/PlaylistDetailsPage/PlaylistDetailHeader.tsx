import React from "react";
import { PlaylistInfoType } from "../../../types";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";

type PlaylistDetailHeaderProps = {
  playlistInfo: PlaylistInfoType;
};

const fac = new FastAverageColor();

const PlaylistDetailHeader = ({ playlistInfo }: PlaylistDetailHeaderProps) => {
  const [dominantColor, setDominantColor] = React.useState<
    string | undefined
  >();

  const getColor = async () => {
    if (playlistInfo.images[0]?.url) {
      try {
        const response = await fac.getColorAsync(playlistInfo.images[0].url);
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
            src={playlistInfo.images[0]?.url}
            alt={playlistInfo.name}
            h={72}
            w={72}
            objectFit="cover"
          />
          <Flex gap={4}>
            <Box>
              <Text fontSize={"10pt"} fontWeight={600}>
                {playlistInfo.public ? "Public" : "Private"}
              </Text>
              <Text fontSize={{base: '2xl', md: '4xl', xl: "5xl"}} fontWeight={600}>
                {playlistInfo.name}
              </Text>
              <Stack mb={4}>
                <Text fontSize={"10pt"} fontWeight="semibold" mr={2}>
                  Created By: {playlistInfo.owner.display_name}
                </Text>
                <Flex alignItems={"center"} gap={2}>
                  <Text>{playlistInfo.tracks.total} Tracks</Text>
                  <Box h={2} w={2} bg="brand.900" borderRadius={"50%"} />
                  <Text>
                    {playlistInfo.followers.total.toLocaleString()} Follower
                    {playlistInfo.followers.total > 1 && "s"}
                  </Text>
                </Flex>
                {playlistInfo.description && <Box>
                  <Text fontSize={'10pt'} fontWeight={'bold'} color='brand.600'>Description:</Text>
                  <Text>{playlistInfo.description}</Text>
                </Box>}
              </Stack>
              {/* <Button
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
                </Button> */}
            </Box>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default PlaylistDetailHeader;
