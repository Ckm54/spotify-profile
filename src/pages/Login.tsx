import { Button, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import authenticateUser from "../api/auth";
import { tokenState } from "../atom/TokenAtom";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/login"
    : "https://xyz.com";

type Props = {};

const clientID = import.meta.env.VITE_CLIENT_ID;

const Login = (props: Props) => {

  return (
    <Stack
      justifyContent={"center"}
      alignItems="center"
      minHeight={"100vh"}
      minWidth="100vw"
      gap={5}
    >
      <Image src="../../public/spotify-2.svg" alt="spotify-logo" height={50} width={50} />
      <Text fontSize={"24px"} my={4}>
        My spotify profile
      </Text>
      <Button variant={"solid"} px={"32px"} py={"16px"}>
        <a href={LOGIN_URI}>Log into spotify</a>
      </Button>
    </Stack>
  );
};

export default Login;
