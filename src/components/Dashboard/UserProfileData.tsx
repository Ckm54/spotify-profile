import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userProfileState } from "../../atom/UserDataAtom";
import { userFollowedArtistsState } from "../../atom/UserFollowedArtists";
import { FastAverageColor } from "fast-average-color";
import React from "react";

type Props = {};

const fac = new FastAverageColor();

const UserProfileData = (props: Props) => {
  const [userData] = useRecoilState(userProfileState);
  const [artistsFollowed] = useRecoilState(userFollowedArtistsState);
  const [dominantColor, setDominantColor] = React.useState<
    string | undefined
  >();

  const getColor = async () => {
    try {
      const response = await fac.getColorAsync(userData.images[0]?.url);
      if (response) {
        return response;
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getColor().then((color) => setDominantColor(color?.rgb));

  }, [getColor]);

  return (
    <Stack position={"relative"}>
      <Box
        bgGradient={`linear(to-b, ${dominantColor}, transparent)`}
        backgroundRepeat="repeat"
        position="absolute"
        minWidth="100%"
        minH={"50vh"}
      />
      <Flex gap={4} pt={10} px={5} position="relative" alignItems={'center'}>
        <Image
          src={userData.images[0]?.url}
          h={40}
          w={40}
          borderRadius={"50%"}
        />
        <Flex gap={4}>
          <Stack>
            <Text fontSize={'10pt'} fontWeight={600}>Logged in as</Text>
            <Text fontSize={'5xl'} fontWeight={600}>{userData.display_name}</Text>
            <Flex alignItems={'center'} gap={4}>
              <Text>{userData.followers.total} Followers</Text>
              <Box h={3} w={3} bg='#fff' borderRadius={'50%'} />
              <Text>{artistsFollowed.artists.total} Following</Text>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default UserProfileData;
