import { Box, Divider, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillGithub, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { TbMicrophone2, TbPlaylist } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { logout } from "../../api/spotify";
import { userProfileState } from "../../atom/UserDataAtom";
import NavBar from "../NavBar/NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeLink, setActiveLink] = React.useState<string>("");
  const [userInfo] = useRecoilState(userProfileState);

  React.useEffect(() => {
    setActiveLink("home");
  }, []);

  const handleNavigate = (title: string) => {
    setActiveLink(title);
  };

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
          width={{ base: "100%", md: 200 }}
          top={{ base: "auto", md: "unset" }}
          bottom={{ base: 0, md: "unset" }}
          right={{ base: 0, md: "unset" }}
        >
          <Stack flex={{ base: 1, md: 0.8 }}>
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "center", md: "flex-start" }}
              justifyContent={{ base: "space-between" }}
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
                    md: activeLink === link.title ? "brand.900" : "transparent",
                  }}
                  borderBottomWidth={{ base: 4, md: 0 }}
                  borderBottomColor={{
                    base:
                      activeLink === link.title ? "brand.900" : "transparent",
                    md: "transparent",
                  }}
                  color={activeLink === link.title ? "brand.900" : "unset"}
                  height="60px"
                  px={2}
                  cursor="pointer"
                  _hover={{
                    color: "brand.900",
                  }}
                  onClick={() => handleNavigate(link.title)}
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
              <Text color={'gray.300'}>Top Albums:</Text>
              <Text>Album 1:</Text>
              <Divider />
              <Text color={'gray.300'}>Top Playlists:</Text>
              <Text>Playlist 1</Text>
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
            <Flex gap={2} cursor="pointer" _hover={{ color: "blue.500" }} py={4}>
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
        <Box as="main" ml={{ base: 0, md: 200 }} width={"100"}>
          {children}
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
