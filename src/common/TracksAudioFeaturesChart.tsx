import React from "react";
import { useQuery } from "react-query";
import { getTracksAudioFeatures } from "../api/apiCalls";
import {
  AudioFeature,
  AudioFeaturesType,
  TrackAudioFeaturesType,
} from "../../types";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { AUDIO_PROPERTIES } from "../constants";
import { getArrayAverage } from "../utils";
import { features } from "process";

type TracksAudioFeaturesChartProps = {
  trackIds: string;
};

const TracksAudioFeaturesChart = ({
  trackIds,
}: TracksAudioFeaturesChartProps) => {
  const [trackAudioFeatues, setTrackAudioFeatues] =
    React.useState<TrackAudioFeaturesType>({
      audio_features: [],
    });

  const {} = useQuery(
    ["getTrackAudioFeatures"],
    () => getTracksAudioFeatures(trackIds),
    {
      onSuccess: (data: TrackAudioFeaturesType) => {
        setTrackAudioFeatues(data);
        // const properties = data.audio_features.map((feature: AudioFeature) => Object.keys(feature))
        // setAudioProperties(properties[0])
      },
    }
  );

  const createDataset = (audioFeatures: any) => {
    const dataset: { [key: string]: string | number } = {};
    AUDIO_PROPERTIES.forEach((property: string) => {
      dataset[property] = audioFeatures.length
        ? getArrayAverage(
            audioFeatures.map((feature: any) => feature && feature[property])
          )
        : audioFeatures[property];
    });

    return dataset;
  };

  const data: ChartData = {
    labels: ["hey", "there"],
    datasets: [
      
    ],
  };
  return <>{/* <Bar data={datasets: trackAudioFeatues.audio_features} /> */}</>;
};

export default TracksAudioFeaturesChart;
