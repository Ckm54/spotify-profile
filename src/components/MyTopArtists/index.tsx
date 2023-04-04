import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TopArtistProfile, TopArtists, TopItemsParams } from "../../../types";
import { getTopArtists } from "../../api/apiCalls";
import { longTermArtistsState } from "../../atom/TopArtistsAtom";
import Artist from "../Dashboard/UserTopArtists/Artist";
import TopArtistInfo from "./TopArtistInfo";

type Props = {};

const MyTopArtists = (props: Props) => {
  const [longTermTopArtists, setLongTermTopArtists] =
    useRecoilState(longTermArtistsState);
  const navigate = useNavigate();

  const longTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "long_term",
  };
  const { isLoading } = useQuery(
    ["getAllTopArtists", longTermParams],
    () => getTopArtists(longTermParams),
    {
      onSuccess: (data: TopArtists) => {
        setLongTermTopArtists(data);
      },
    }
  );

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <Box px={{base: 4, md: 8}}>
      <Flex justifyContent={"space-between"} py={4} gap={{base: 2, md: 0}}flexDirection={{base: 'column', md: 'row'}}>
        <Text fontWeight={600}>Top Artists</Text>
        <Flex color="brand.600" fontSize={{base: '10pt'}} gap={4}>
          <Text cursor="pointer">All Time</Text>
          <Text cursor="pointer">Last 6 Months</Text>
          <Text cursor="pointer">Last 1 month</Text>
        </Flex>
      </Flex>

      <Flex flexWrap={'wrap'} gap={{base: 4, lg: 8}} justifyContent={{base: 'center', md: 'space-between'}} >
        {longTermTopArtists?.items.map((artistInfo: TopArtistProfile) => (
          <Artist
            artistProfileInfo={artistInfo}
            imgSize={40}
            withHover={true}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default MyTopArtists;
