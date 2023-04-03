import React from "react";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";

type Props = {};

const Dashboard = (props: Props) => {
  const [userData] = useRecoilState(userProfileState);

  return <div>Dashboard {userData.display_name}</div>;
};

export default Dashboard;
