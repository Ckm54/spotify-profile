import { GridItem, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RelatedArtistsType } from "../../../types";
import { useNavigate } from "react-router-dom";
import { formatStringEllipsis } from "../../utils";

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
        height={{base: 32, md: 56}}
        width={{base: 32, md: 56}}
        objectFit={"cover"}
        borderRadius="50%"
        position="relative"
      />
      <Stack
        hidden={!isHovering}
        transition={"all .3s ease"}
        borderRadius={"50%"}
        width={{base: 32, md: 56}}
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
        <Text color="white" display={{base: 'none', md: 'unset'}} fontWeight="semibold">
          {artist.name}
        </Text>
        <Text color="white" display={{base: 'unset', md: 'none'}} fontWeight="semibold">
          {formatStringEllipsis(artist.name, 5)}
        </Text>
      </Stack>
    </GridItem>
  );
};

export default RelatedArtist;
