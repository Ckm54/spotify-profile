import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { ArtistsFollowed, FollowedArtist } from "../../../../types";
import { userFollowedArtistsState } from "../../../atom/UserFollowedArtists";
import Artist from "../UserTopArtists/Artist";

type Props = {};

const UserFollowing = (props: Props) => {
  const [followedArtists] = useRecoilState(userFollowedArtistsState);

  return (
    <Box flex={1} px={{base: 8, md: 0}}>
      <Flex my={8} justifyContent={"space-between"} alignItems="center" pr={{md: 5}}>
        <Text color={"#fff"} fontWeight={600}>
          Following
        </Text>
        <Text color="brand.600" cursor="pointer" _hover={{ color: "#fff" }}>
          View all
        </Text>
      </Flex>

      <Flex flexWrap={'wrap'} gap={4} justifyContent={{base: 'space-between', md: 'unset'}}>
        {followedArtists?.artists?.items?.map(
          (artist: FollowedArtist, index: number) =>
            index < 8 && (
              <Artist
                artistProfileInfo={artist}
                key={artist.id}
                withHover={false}
                imgSize={32}
              />
            )
        )}
      </Flex>
    </Box>
  );
};

export default UserFollowing;
