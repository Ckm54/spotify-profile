import React from "react";
import { Album } from "../../types";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MONTH_NAMES_SHORT } from "../constants";
import { formatStringEllipsis } from "../utils";
import { useNavigate } from "react-router-dom";

type AlbumCardProps = {
  albumInfo: Album;
};

const AlbumCard = ({ albumInfo }: AlbumCardProps) => {

  const navigate = useNavigate();

  return (
    <Card cursor="pointer" maxW={"sm"} bg="blackAlpha.200" onClick={() => navigate(`/album/${albumInfo.id}`)}>
      <CardBody p={2}>
        <Image
          src={albumInfo.images[0]?.url}
          alt={albumInfo.name}
          height={40}
          w={40}
          objectFit={"cover"}
        />
        <Box color={"brand.500"} my={2}>
            <Text fontSize={"11pt"} py={1}>
              {formatStringEllipsis(albumInfo.name, 18)}
            </Text>
          <Flex alignItems={'center'} gap={2}mb={1}>
            <Box h={2} w={2} bg="brand.900" borderRadius={"50%"} />
            <Text fontSize={"10pt"}>
              (
              {new Date(albumInfo.release_date).getFullYear().toString() +
                " " +
                MONTH_NAMES_SHORT[new Date(albumInfo.release_date).getMonth()]}
              )
            </Text>
          </Flex>
          <Flex gap={2}>
            <Text
              fontWeight={"600 light"}
              textTransform={"uppercase"}
              fontSize={"10pt"}
            >
              {albumInfo.album_group}
            </Text>
            <Text fontWeight={"semibold"} fontSize={"10pt"}>
              ({albumInfo.total_tracks}tracks)
            </Text>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};

export default AlbumCard;
