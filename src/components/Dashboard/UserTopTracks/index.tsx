import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { TopTracks, Track } from "../../../../types";
import { getTopTracks } from "../../../api/apiCalls";
import TrackInfo from "./TrackInfo";

type Props = {};

const UserTopTracks = (props: Props) => {
  const [topTracks, setTopTracks] = React.useState<TopTracks>();

  const { isLoading } = useQuery("getTopTracks", () => getTopTracks(), {
    onSuccess: (data: TopTracks) => {
      setTopTracks(data);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box px={4}>
      <Flex justifyContent={"space-between"} alignItems="center" px={5}>
        <Text color={"#fff"} fontWeight={600} mb={8}>
          Top tracks
        </Text>
        <Text color="brand.600" cursor="pointer" _hover={{ color: "#fff" }}>
          View all
        </Text>
      </Flex>
      {topTracks?.items?.map((track: Track, index: number) => (
        <TrackInfo track={track} index={index + 1} key={track.id} />
      ))}
    </Box>
  );
};

export default UserTopTracks;
