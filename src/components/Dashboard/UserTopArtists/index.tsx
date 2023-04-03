import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { TopArtistProfile, TopArtists } from "../../../../types";
import { getTopArtists } from "../../../api/apiCalls";
import Artist from "./Artist";

type Props = {};

const UserTopArtists = (props: Props) => {
  const [userTopArtists, setUserTopArtists] = React.useState<TopArtists>();

  const { isLoading } = useQuery("getTopArtists", () => getTopArtists(), {
    onSuccess: (data: TopArtists) => {
      setUserTopArtists(data);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box mt={4} minW="100%" bg="blackAlpha.100" px={4}>
      <Flex my={8} justifyContent={"space-between"} alignItems="center" px={5}>
        <Text color={"#fff"} fontWeight={600}>
          Top Artists
        </Text>
        <Text color="brand.600" cursor="pointer" _hover={{ color: "#fff" }}>
          View all
        </Text>
      </Flex>
      <Flex justifyContent={"space-evenly"} flexWrap={"wrap"}>
        {userTopArtists?.items?.map((artistProfile: TopArtistProfile) => (
          <Artist artistProfileInfo={artistProfile} key={artistProfile.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default UserTopArtists;
