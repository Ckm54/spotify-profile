import { GridItem, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RelatedArtistsType } from "../../../types";
import { useNavigate } from "react-router-dom";

type Props = {
  artist: RelatedArtistsType;
};

const RelatedArtist = ({ artist }: Props) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <GridItem
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      key={artist.id}
      position="relative"
      cursor={"pointer"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      <Image
        src={artist.images[0]?.url}
        alt={artist.name}
        cursor={"pointer"}
        height={56}
        width={56}
        objectFit={"cover"}
        borderRadius="50%"
        position="relative"
      />
      <Stack
        hidden={!isHovering}
        transition={"all .3s ease"}
        borderRadius={"50%"}
        width={56}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundClip={"border-box"}
        bg="rgba(0, 0, 0, 0.6)"
        position={"absolute"}
        top={0}
        left={"auto"}
        height="100%"
      >
        <Icon fontSize={"2rem"} as={FaInfoCircle} />
        <Text color="white" fontWeight="semibold">
          {artist.name}
        </Text>
      </Stack>
    </GridItem>
  );
};

export default RelatedArtist;
