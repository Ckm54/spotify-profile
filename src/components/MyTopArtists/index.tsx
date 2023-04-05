import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TopArtistProfile, TopArtists, TopItemsParams } from "../../../types";
import { getTopArtists } from "../../api/apiCalls";
import {
  longTermArtistsState,
  mediumTermArtistsState,
  shortTermArtistsState,
} from "../../atom/TopArtistsAtom";
import Artist from "../Dashboard/UserTopArtists/Artist";
import TopArtistInfo from "./TopArtistInfo";

interface ActiveTab {
  name: "allTime" | "medium" | "short";
}

type Props = {};

const MyTopArtists = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>({
    name: "allTime",
  });

  const [longTermTopArtists, setLongTermTopArtists] =
    useRecoilState(longTermArtistsState);
  const [mediumTermTopArtists, setMediumTermTopArtists] = useRecoilState(
    mediumTermArtistsState
  );
  const [shortTermTopArtists, setShortTermTopArtists] = useRecoilState(
    shortTermArtistsState
  );

  const navigate = useNavigate();

  const longTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "medium_term",
  };

  const mediumTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "medium_term",
  };

  const shortTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "short_term",
  };

  const { isLoading: longTermLoading } = useQuery(
    ["getMediumTermTopArtists", mediumTermParams],
    () => getTopArtists(longTermParams),
    {
      onSuccess: (data: TopArtists) => {
        setLongTermTopArtists(data);
      },
    }
  );

  const { isLoading } = useQuery(
    ["getMediumTermTopArtists", mediumTermParams],
    () => getTopArtists(mediumTermParams),
    {
      onSuccess: (data: TopArtists) => {
        setMediumTermTopArtists(data);
      },
    }
  );

  const { isLoading: loadingShortTerm } = useQuery(
    ["getShortTermTopArtists", shortTermParams],
    () => getTopArtists(shortTermParams),
    {
      onSuccess: (data: TopArtists) => {
        setShortTermTopArtists(data);
      },
    }
  );

  return (
    <Box px={{ base: 4, md: 8 }}>
      <Flex
        justifyContent={"space-between"}
        py={4}
        gap={{ base: 2, md: 0 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text fontWeight={600}>Top Artists</Text>
        <Flex
          color="brand.600"
          fontSize={{ base: "10pt" }}
          fontWeight={600}
          gap={4}
        >
          <Text
            cursor="pointer"
            color={activeTab.name === "allTime" ? "white" : "unset"}
            borderBottom={
              activeTab.name === "allTime" ? "2px solid #fff" : "unset"
            }
            onClick={() => setActiveTab({ ...activeTab, name: "allTime" })}
          >
            All Time
          </Text>
          <Text
            cursor="pointer"
            color={activeTab.name === "medium" ? "white" : "unset"}
            borderBottom={
              activeTab.name === "medium" ? "2px solid #fff" : "unset"
            }
            onClick={() => setActiveTab({ ...activeTab, name: "medium" })}
          >
            Last 6 Months
          </Text>
          <Text
            cursor="pointer"
            color={activeTab.name === "short" ? "white" : "unset"}
            borderBottom={
              activeTab.name === "short" ? "2px solid #fff" : "unset"
            }
            onClick={() => setActiveTab({ ...activeTab, name: "short" })}
          >
            Last 1 month
          </Text>
        </Flex>
      </Flex>

      {isLoading || loadingShortTerm || longTermLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Grid
          templateColumns={{ md: "repeat(3, 1fr)", xl: "repeat(7, 1fr)" }}
          gap={{ base: 4, xl: 2 }}
        >
          {activeTab.name === "allTime"
            ? longTermTopArtists?.items.map((artistInfo: TopArtistProfile) => (
                <GridItem key={artistInfo.id}>
                  <Artist
                    artistProfileInfo={artistInfo}
                    imgSize={40}
                    withHover={true}
                  />
                </GridItem>
              ))
            : activeTab.name === "medium"
            ? mediumTermTopArtists?.items.map(
                (artistInfo: TopArtistProfile) => (
                  <GridItem key={artistInfo.id}>
                    <Artist
                      artistProfileInfo={artistInfo}
                      imgSize={40}
                      withHover={true}
                    />
                  </GridItem>
                )
              )
            : shortTermTopArtists?.items.map((artistInfo: TopArtistProfile) => (
                <GridItem key={artistInfo.id}>
                  <Artist
                    artistProfileInfo={artistInfo}
                    imgSize={40}
                    withHover={true}
                  />
                </GridItem>
              ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyTopArtists;
