import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TopArtistProfile } from "../../../../types";
import { longTermArtistsState } from "../../../atom/TopArtistsAtom";
import Artist from "./Artist";

const UserTopArtists = () => {
  const [userTopArtists] = useRecoilState(longTermArtistsState);
  const navigate = useNavigate();

  return (
    <Box mt={4} minW="100%" bg="blackAlpha.100" px={4}>
      <Flex my={8} justifyContent={"space-between"} alignItems="center" px={5}>
        <Text color={"#fff"} fontWeight={600}>
          All Time Top Artists
        </Text>
        <Text
          color="brand.600"
          cursor="pointer"
          _hover={{ color: "#fff" }}
          onClick={() => navigate("/top-artists")}
        >
          View all
        </Text>
      </Flex>
      <Flex
        justifyContent={"space-evenly"}
        gap={2}
        flexWrap={{ base: "wrap", xl: "nowrap" }}
      >
        {userTopArtists?.items?.map(
          (artistProfile: TopArtistProfile, index: number) =>
            index < 8 && (
              <Artist
                artistProfileInfo={artistProfile}
                key={artistProfile.id}
                withHover={true}
                imgSize={40}
              />
            )
        )}
      </Flex>
    </Box>
  );
};

export default UserTopArtists;
