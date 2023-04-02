import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { logout } from "../../api/spotify";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav>
      <Flex justifyContent={'space-between'} py={4} bg='#000' px={'32px'}>
        <Flex justifyContent={'center'} alignItems='center' gap={2} cursor='pointer'>
          <Image src="../../../public/spotify-white.png" alt="spotify-logo" />
          <Text color={"#fff"} fontWeight={600} fontSize={"18pt"}>
            SpotifyProfile
          </Text>
        </Flex>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </Flex>
    </nav>
  );
};

export default NavBar;
