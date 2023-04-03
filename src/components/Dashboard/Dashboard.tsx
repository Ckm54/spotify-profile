import { Box } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";

type Props = {};

const Dashboard = (props: Props) => {
  const [userData] = useRecoilState(userProfileState);

  return <Box>Dashboard {userData.display_name}</Box>;
};

export default Dashboard;
