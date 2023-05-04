import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TopItemsParams, TopTracks, Track } from "../../../../types";
import { getTopTracks } from "../../../api/apiCalls";
import TrackInfo from "./TrackInfo";
import Loader from "../../../common/Loader";

type Props = {};

const UserTopTracks = (props: Props) => {
  const [topTracks, setTopTracks] = React.useState<TopTracks>();
  const navigate = useNavigate();

  const params: TopItemsParams = {
    limit: 5,
    timeRange: "long_term",
  };

  const { isLoading } = useQuery(
    ["getTopTracks", params],
    () => getTopTracks(params),
    {
      onSuccess: (data: TopTracks) => {
        setTopTracks(data);
      },
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Box px={4}>
      <Flex justifyContent={"space-between"} alignItems="center" px={5}>
        <Text color={"#fff"} fontWeight={600} mb={8}>
          All Time Top tracks
        </Text>
        <Text
          color="brand.600"
          cursor="pointer"
          _hover={{ color: "#fff" }}
          onClick={() => navigate("/top-tracks")}
        >
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
