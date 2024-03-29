import { Box, Image, Stack, Text, Icon, Flex } from "@chakra-ui/react";
import { TfiInfoAlt } from "react-icons/tfi";
import React from "react";
import { TopArtistProfile } from "../../../../types";
import { useNavigate } from "react-router-dom";

type ArtistProps = {
  artistProfileInfo: TopArtistProfile;
  withHover: boolean;
  imgSize: number;
};

const Artist = ({ artistProfileInfo, withHover, imgSize }: ArtistProps) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Stack
      flexGrow={{ base: 1 }}
      alignItems={{ base: "center", md: "flex-start" }}
      py={{ base: 8, md: 8 }}
      px={4}
      bg={"blackAlpha.300"}
      borderRadius={10}
      cursor="pointer"
      transition={"all 0.2s ease"}
      _hover={{
        backgroundColor: "blackAlpha.500",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      mb={8}
      onClick={() => navigate(`/artist/${artistProfileInfo.id}`)}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        mb={2}
      >
        <Box position={"relative"}>
          <Image
            src={artistProfileInfo.images[0]?.url}
            alt={artistProfileInfo.name}
            height={{ base: 20, md: 32, xl: imgSize }}
            width={{ base: 20, md: 32, xl: imgSize }}
            borderRadius={"50%"}
            objectFit="cover"
          />
          <Box
            position={"absolute"}
            bottom={2}
            right={0}
            height={10}
            width={10}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            bg={withHover ? "brand.900" : 'brand.500'}
            p={6}
            borderRadius="50%"
            hidden={!isHovering}
          >
            <Icon as={TfiInfoAlt} color="brand.700" h={6} w={6} />
          </Box>
        </Box>
      </Flex>
      <Text fontSize={"11pt"}>{artistProfileInfo.name}</Text>
      <Text textTransform={"capitalize"} fontSize="10pt" fontWeight={600}>
        {artistProfileInfo.type}
      </Text>
    </Stack>
  );
};

export default Artist;
