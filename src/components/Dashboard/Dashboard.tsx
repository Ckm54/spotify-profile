import { Box, Stack } from "@chakra-ui/react";
import UserTopArtists from "./UserTopArtists";
import UserProfileData from "./UserProfileData";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Box maxW={"100vw"}>
      <UserProfileData />
      <Stack position={'relative'}>
        <UserTopArtists />
      </Stack>
    </Box>
  );
};

export default Dashboard;
