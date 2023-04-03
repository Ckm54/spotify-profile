import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import UserTopArtists from "./UserTopArtists";
import UserProfileData from "./UserProfileData";
import UserTopTracks from "./UserTopTracks";
import UserPlaylists from "./UserPlaylists";
import UserFollowing from "./UserFollowing";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Box maxW={"100vw"}>
      <UserProfileData />
      <Stack position={'relative'}>
        <UserTopArtists />
        <UserTopTracks />
        <Divider pt={4} colorScheme={'twitter'} />
        <Flex flexDirection={{base: 'column', md: 'row'}} justifyContent={{md: 'space-evenly'}}>
          <UserPlaylists />
          <UserFollowing />
        </Flex>
      </Stack>
    </Box>
  );
};

export default Dashboard;
