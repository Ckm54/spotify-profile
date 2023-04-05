import { Box, Divider, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillGithub, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { TbMicrophone2, TbPlaylist } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Playlist } from "../../../types";
import { logout } from "../../api/spotify";
import { userPlaylistsState } from "../../atom/PlaylistsAtom";
import { userProfileState } from "../../atom/UserDataAtom";
import NavBar from "../NavBar/NavBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type LayoutProps = {
  errorElement?: React.ReactNode;
};

//**********************HIGHER ORDER COMPONENT TO LAYOUT THE GENERAL APPLICATION'S UI VISIBLE ON ALL PAGES */

const Layout = ({ errorElement }: LayoutProps) => {
  const [userInfo] = useRecoilState(userProfileState);
  const [userPlaylists] = useRecoilState(userPlaylistsState);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Box
        as={"main"}
        pt={20}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Stack
          justifyContent={"space-between"}
          minH={{ md: "90vh" }}
          position={"fixed"}
          zIndex={99}
          width={{ base: "100%", md: 200, xl: 250 }}
          top={{ base: "auto", md: "unset" }}
          bottom={{ base: 0, md: "unset" }}
          right={{ base: 0, md: "unset" }}
        >
          <Stack flex={{ base: 1, md: 0.8 }}>
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "center", md: "flex-start" }}
              justifyContent={{ base: "space-between" }}
              bg={{ base: "rgba(0, 0, 0, 0.86)", md: "unset" }}
              pt={{ base: 4, md: 0 }}
              pb={{ base: 2, md: 0 }}
            >
              {navLinks.main.map((link, index: number) => (
                <Flex
                  key={index}
                  direction={{ base: "column", md: "row" }}
                  justifyContent={"center"}
                  alignItems="center"
                  gap={2}
                  borderLeftWidth={{ md: 4 }}
                  borderLeftColor={{
                    md:
                      location.pathname === link.href
                        ? "brand.900"
                        : "transparent",
                  }}
                  borderBottomWidth={{ base: 4, md: 0 }}
                  borderBottomColor={{
                    base:
                      location.pathname === link.href
                        ? "brand.900"
                        : "transparent",
                    md: "transparent",
                  }}
                  color={
                    location.pathname === link.href ? "brand.900" : "unset"
                  }
                  height="50px"
                  px={2}
                  cursor="pointer"
                  _hover={{
                    color: "brand.900",
                  }}
                  onClick={() => navigate(link.href)}
                >
                  <Icon
                    as={link.icon}
                    w={{ base: 5, md: 6 }}
                    h={{ base: 5, md: 6 }}
                  />
                  <Text
                    textTransform={"capitalize"}
                    fontSize={{ base: "8pt", md: "10pt" }}
                  >
                    {link.title}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <Stack display={{ base: "none", md: "unset" }} px={2}>
              <Divider />
              <Flex
                justifyContent={"space-between"}
                alignItems={{ xl: "center" }}
                flexDirection={{ md: "column", xl: "row" }}
              >
                <Text color={"gray.300"} fontSize={"0.875rem"} fontWeight={600}>
                  Top 10 Playlists:
                </Text>
                <Text
                  color="brand.600"
                  cursor="pointer"
                  fontSize={"0.875rem"}
                  fontWeight="semibold"
                  _hover={{ color: "brand.900" }}
                  onClick={() => navigate("/playlists")}
                  mt={{ md: 2, xl: 0 }}
                >
                  View all
                </Text>
              </Flex>
              {userPlaylists.items.map(
                (playlist: Playlist, index: number) =>
                  index < 10 && (
                    <Flex gap={2} pt={1} alignItems="center" key={playlist.id}>
                      <Image
                        src={playlist.images[0]?.url}
                        alt={playlist.name}
                        height={6}
                        borderRadius="50%"
                      />
                      <Text
                        fontSize={"10pt"}
                        noOfLines={1}
                        color={"brand.600"}
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {playlist.name}
                      </Text>
                    </Flex>
                  )
              )}
            </Stack>
          </Stack>

          <Stack display={{ base: "none", md: "unset" }} px={2}>
            <Flex alignItems={"flex-end"} gap={2}>
              <Image
                src={userInfo.images[0]?.url}
                alt={`${userInfo.display_name}'s profile image`}
                h={20}
                w={"auto"}
              />
              <Text fontSize={{ base: "8pt", md: "12pt" }}>
                {userInfo.display_name}
              </Text>
            </Flex>
            <Flex
              gap={2}
              cursor="pointer"
              _hover={{ color: "blue.500" }}
              py={4}
            >
              <Icon
                as={AiFillGithub}
                w={{ base: 5, md: 6 }}
                h={{ base: 5, md: 6 }}
              />
              <Text fontSize={{ base: "8pt", md: "12pt" }}>Github link</Text>
            </Flex>
            <Flex
              alignItems={"center"}
              gap={2}
              cursor="pointer"
              _hover={{ color: "brand.900" }}
              onClick={logout}
            >
              <Icon
                as={AiOutlineLogout}
                w={{ base: 5, md: 6 }}
                h={{ base: 5, md: 6 }}
              />
              <Text fontSize={{ base: "8pt", md: "12pt" }}>Logout</Text>
            </Flex>
          </Stack>
        </Stack>
        <Box as="main" ml={{ base: 0, md: 200, xl: 250 }} width={"100%"}>
          {/* EXPERIMENTATION FOR BACK AND FORWARD BUTTONS */}
          {/* <Box position={"absolute"} top={40} right={200} zIndex={9999}>
            <Flex gap={4}>
              <Box
                borderWidth={"1px"}
                transition={"all .3s ease"}
                borderRadius={"50%"}
                cursor="pointer"
                _hover={{ borderColor: "brand.900", color: "brand.900" }}
                onClick={() => navigate(-1)}
              >
                <ChevronLeftIcon fontSize={"5xl"} />
              </Box>
              <Box
                borderWidth={"1px"}
                transition={"all .3s ease"}
                borderRadius={"50%"}
                cursor="pointer"
                _hover={{ borderColor: "brand.900", color: "brand.900" }}
              >
                <ChevronRightIcon fontSize={"5xl"} />
              </Box>
            </Flex>
          </Box> */}
          {errorElement ? errorElement : <Outlet />}
          <Divider mt={8} />
          <Box minH={20} />
        </Box>
      </Box>
    </>
  );
};

export default Layout;

const navLinks = {
  main: [
    {
      title: "home",
      href: "/",
      isActive: false,
      icon: AiOutlineHome,
    },
    {
      title: "top artists",
      href: "/top-artists",
      isActive: false,
      icon: TbMicrophone2,
    },
    {
      title: "top tracks",
      href: "/top-tracks",
      isActive: false,
      icon: BsMusicNoteBeamed,
    },
    {
      title: "playlists",
      href: "/playlists",
      isActive: false,
      icon: TbPlaylist,
    },
    {
      title: "recently played",
      href: "/recently-played",
      isActive: false,
      icon: RxCounterClockwiseClock,
    },
  ],
  links: [
    {
      title: "github",
      href: "https://github.com/Ckm54",
      icon: AiFillGithub,
    },
  ],
};
