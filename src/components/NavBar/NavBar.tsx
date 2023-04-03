import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
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
      <Flex
        justifyContent={"space-between"}
        py={3}
        bg="#000"
        px={{base: '8px', md: "32px"}}
        position="fixed"
        zIndex={10}
        as={"header"}
        w="100vw"
      >
        <Flex
          justifyContent={"center"}
          alignItems="center"
          gap={2}
          cursor="pointer"
        >
          <Image src="../../../public/spotify-white.png" alt="spotify-logo" />
          <Text color={"#fff"} fontWeight={600} fontSize={{ md: "18pt" }}>
            SpotifyProfile
          </Text>
        </Flex>
        <Menu>
          <MenuButton
            // borderWidth={"0.13rem"}
            transition="all 0.2s"
            // borderRadius={50}
            px={{md: 4}}
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
              <Text fontWeight={600} display={{ base: "none", md: "unset" }}>
                {userData.display_name}
              </Text>
              <ChevronDownIcon
                display={{ base: "none", md: "unset" }}
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
