import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TopArtistProfile, TopArtists, TopItemsParams } from "../../../../types";
import { getTopArtists } from "../../../api/apiCalls";
import Artist from "./Artist";

type Props = {};

const UserTopArtists = (props: Props) => {
  const [userTopArtists, setUserTopArtists] = React.useState<TopArtists>();
  const navigate = useNavigate();

  const params: TopItemsParams = {
    limit: 8,
    timeRange: 'long_term'
  }
  const { isLoading } = useQuery(["getTopArtists", params], () => getTopArtists(params), {
    onSuccess: (data: TopArtists) => {
      setUserTopArtists(data);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box mt={4} minW="100%" bg="blackAlpha.100" px={4}>
      <Flex my={8} justifyContent={"space-between"} alignItems="center" px={5}>
        <Text color={"#fff"} fontWeight={600}>
          All Time Top Artists
        </Text>
        <Text color="brand.600" cursor="pointer" _hover={{ color: "#fff" }} onClick={() => navigate('/top-artists')}>
          View all
        </Text>
      </Flex>
      <Flex justifyContent={"space-evenly"} gap={2} flexWrap={"nowrap"}>
        {userTopArtists?.items?.map((artistProfile: TopArtistProfile) => (
          <Artist artistProfileInfo={artistProfile} key={artistProfile.id} withHover={true} imgSize={40} />
        ))}
      </Flex>
    </Box>
  );
};

export default UserTopArtists;
