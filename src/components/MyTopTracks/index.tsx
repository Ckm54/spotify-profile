import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  TopArtistProfile,
  TopArtists,
  TopItemsParams,
  TopTracks,
  Track,
} from "../../../types";
import { getTopArtists, getTopTracks } from "../../api/apiCalls";
import {
  longTermArtistsState,
  mediumTermArtistsState,
  shortTermArtistsState,
} from "../../atom/TopArtistsAtom";
import {
  longTermTracksState,
  mediumTermTracksState,
  shortTermTracksState,
} from "../../atom/TopTracksAtom";
import Artist from "../Dashboard/UserTopArtists/Artist";
import TrackInfo from "../Dashboard/UserTopTracks/TrackInfo";

interface ActiveTab {
  name: "allTime" | "medium" | "short";
}

type Props = {};

const MyTopTracks = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>({
    name: "allTime",
  });

  const [longTermTopTracks, setLongTermTopTracks] =
    useRecoilState(longTermTracksState);
  const [mediumTermTopTracks, setMediumTermTopTracks] = useRecoilState(
    mediumTermTracksState
  );
  const [shortTermTopTracks, setShortTermTopTracks] =
    useRecoilState(shortTermTracksState);

  const navigate = useNavigate();

  const longTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "long_term",
  };

  const mediumTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "medium_term",
  };

  const shortTermParams: TopItemsParams = {
    limit: 30,
    timeRange: "short_term",
  };

  const { isLoading } = useQuery(
    ["getLongTermTopTracks", longTermParams],
    () => getTopTracks(longTermParams),
    {
      onSuccess: (data: TopTracks) => {
        setLongTermTopTracks(data);
      },
    }
  );

  const {} = useQuery(
    ["getMediumTermTopTracks", mediumTermParams],
    () => getTopTracks(mediumTermParams),
    {
      onSuccess: (data: TopTracks) => {
        setMediumTermTopTracks(data);
      },
    }
  );

  const {} = useQuery(
    ["getShortTermTopTracks", shortTermParams],
    () => getTopTracks(shortTermParams),
    {
      onSuccess: (data: TopTracks) => {
        setShortTermTopTracks(data);
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
        <Text fontWeight={600}>Top Tracks</Text>
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

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Grid>
          {activeTab.name === "allTime"
            ? longTermTopTracks?.items.map((trackInfo: Track, index: number) => (
                  <TrackInfo track={trackInfo} index={index + 1} key={trackInfo.id}/>
              ))
            : activeTab.name === "medium"
            ? mediumTermTopTracks?.items.map((trackInfo: Track, index: number) => (
                  <TrackInfo track={trackInfo} index={index + 1} key={trackInfo.id}/>
              ))
            : shortTermTopTracks?.items.map((trackInfo: Track, index: number) => (
                  <TrackInfo track={trackInfo} index={index + 1} key={trackInfo.id}/>
              ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyTopTracks;
