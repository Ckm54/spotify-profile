import { Box } from "@chakra-ui/react";
import UserProfileData from "./UserProfileData";

type Props = {};

const Dashboard = (props: Props) => {

  return (
    <Box minW={'100vw'}>
      <UserProfileData />
    </Box>
  );
};

export default Dashboard;
