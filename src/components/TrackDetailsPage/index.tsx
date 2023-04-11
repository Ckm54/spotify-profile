import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTrackAudioFeatures, getTrackDetails } from "../../api/apiCalls";
import { Box, Text } from "@chakra-ui/react";
import { AudioFeature, TrackInfoResponseType } from "../../../types";

type TrackDetailsPageProps = {};

const TrackDetailsPage = (props: TrackDetailsPageProps) => {
  const [trackDetails, setTrackDetails] =
    React.useState<TrackInfoResponseType>();
  const [trackAudioFeatures, setTrackAudioFeatures] =
    React.useState<AudioFeature>();
  const [isDetailsFetched, setIsDetailsFetched] =
    React.useState<boolean>(false);

  const { id } = useParams();
  const { isLoading } = useQuery(
    ["getTrackInfo", id],
    () => getTrackDetails(id!),
    {
      onSuccess: (data: TrackInfoResponseType) => {
        setTrackDetails(data);
        setIsDetailsFetched(true);
      },
      enabled: !!id,
    }
  );

  const {} = useQuery(
    ["getTrackAudioFeatures", id],
    () => getTrackAudioFeatures(id!),
    {
      onSuccess: (data: AudioFeature) => {
        setTrackAudioFeatures(data);
      },
      enabled: isDetailsFetched && !!id,
    }
  );

  return (
    <>{isLoading ? <Text>Loading...</Text> : <Box>Track Details page</Box>}</>
  );
};

export default TrackDetailsPage;
