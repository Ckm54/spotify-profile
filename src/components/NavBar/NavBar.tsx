import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { logout } from "../../api/spotify";
import { userProfileState } from "../../atom/UserDataAtom";

type Props = {};

const NavBar = (props: Props) => {
  const [userData] = useRecoilState(userProfileState);

  return (
    <nav>
      <Flex justifyContent={"space-between"} py={2} bg="#000" px={"32px"}>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          gap={2}
          cursor="pointer"
        >
          <Image src="../../../public/spotify-white.png" alt="spotify-logo" />
          <Text color={"#fff"} fontWeight={600} fontSize={"18pt"}>
            SpotifyProfile
          </Text>
        </Flex>
        <Menu>
          <MenuButton
            // borderWidth={"0.13rem"}
            transition="all 0.2s"
            // borderRadius={50}
            px={4}
            py={1}
            _hover={{ color: "brand.900", borderColor: "brand.900" }}
            _expanded={{ color: "brand.900", borderColor: "brand.900" }}
          >
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Avatar
                src={userData.images[0]?.url}
                height={12}
                width={12}
                borderWidth={2}
              />
              <Text fontWeight={600}>{userData.display_name}</Text>
              <ChevronDownIcon
                height={30}
                width={30}
                borderColor="brand.900"
                borderWidth={2}
                borderRadius={50}
              />
            </Stack>
          </MenuButton>
          <MenuList borderWidth={0} bg={"#000"} py={4}>
            <MenuItem bg="#000" _hover={{ color: "brand.900" }} mt={2}>
              <Flex alignItems={"center"} gap={2}>
                <Icon as={RxDashboard} height={5} width={5} />
                <Text>Dashboard</Text>
              </Flex>
            </MenuItem>
            <MenuItem
              mt={2}
              bg="#000"
              onClick={logout}
              _hover={{ color: "brand.900" }}
            >
              <Flex alignItems={"center"} gap={2}>
                <Icon as={AiOutlineLogout} height={5} width={5} />
                <Text>Logout</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </nav>
  );
};

export default NavBar;
