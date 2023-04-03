import { Box, Image, Stack, Text, Icon } from "@chakra-ui/react";
import { TfiInfoAlt } from "react-icons/tfi";
import React from "react";
import { TopArtistProfile } from "../../../../types";

type ArtistProps = {
  artistProfileInfo: TopArtistProfile;
};

const Artist = ({ artistProfileInfo }: ArtistProps) => {

  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  return (
    <Stack
      py={10}
      px={5}
      bg={"blackAlpha.300"}
      borderRadius={10}
      cursor="pointer"
      transition={'all 0.2s ease'}
      _hover={{
        backgroundColor: "blackAlpha.500",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      mb={8}
    >
      <Box position={"relative"}>
        <Image
          src={artistProfileInfo.images[0]?.url}
          height={40}
          width={40}
          borderRadius={"50%"}
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
          bg={"brand.900"}
          p={6}
          borderRadius="50%"
          hidden={!isHovering}
        >
          <Icon as={TfiInfoAlt} color='brand.700' h={6} w={6} />
        </Box>
      </Box>
      <Text fontSize={'11pt'}>{artistProfileInfo.name}</Text>
      <Text textTransform={"capitalize"} fontSize='10pt' fontWeight={600}>
        {artistProfileInfo.type}
      </Text>
    </Stack>
  );
};

export default Artist;
