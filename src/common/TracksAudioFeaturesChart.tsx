// 

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { TrackAudioFeaturesType } from '../../types';
import { useQuery } from 'react-query';
import { getTracksAudioFeatures } from '../api/apiCalls';
import { AUDIO_PROPERTIES } from '../constants';
import { getArrayAverage } from '../utils';
import { Box } from '@chakra-ui/react';

type TracksAudioFeaturesChartProps = {
  trackIds: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top' as const,
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    title: {
      display: true,
      text: `Audio Features`,
      fontSize: 18,
      // fontFamily: `${fonts.primary}`,
      fontColor: '#ffffff',
      padding: 30,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            // fontFamily: `${fonts.primary}`,
            fontSize: 12,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            beginAtZero: true,
            // fontFamily: `${fonts.primary}`,
            fontSize: 12,
          },
        },
      ],
    },
  },
  };

export default function TrackAudioFeaturesChart({ trackIds }: TracksAudioFeaturesChartProps) {

  const [trackAudioFeatues, setTrackAudioFeatues] =
    React.useState<TrackAudioFeaturesType>({
      audio_features: [],
    });
  const[chartData, setChartData] = React.useState<number[]>()
  const[labels, setLabels] = React.useState<string[]>([])

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
    const dataset: { [key: string]: number } = {};
    AUDIO_PROPERTIES.forEach((property: string) => {
      dataset[property] = audioFeatures.length
        ? getArrayAverage(
            audioFeatures.map((feature: any) => feature && feature[property])
          )
        : audioFeatures[property];
    });

    return dataset;
  };

  React.useEffect(() => {
    const ds = createDataset(trackAudioFeatues.audio_features);
    
    setLabels(Object.keys(ds));
    setChartData(Object.values(ds))

    // const data = {
    //   labels,
    //   datasets: [
    //     {
    //       label: '',
    //       data: ,
    //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //     },
    //   ],
    // };

  }, [trackAudioFeatues]);


 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 2',
      data: chartData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 159, 64, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(104, 132, 245, 0.3)',
        'rgba(153, 102, 255, 0.3)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(104, 132, 245, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <Box>
      <Bar width={400} height={400} options={options} data={data} />
    </Box>
  );
}



/**
 * import React from "react";
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

type TracksAudioFeaturesChartProps = {
  trackIds: string;
};

const TracksAudioFeaturesChart = ({
  trackIds,
}: TracksAudioFeaturesChartProps) => {


  const data: ChartData = {
    labels: ["hey", "there"],
    datasets: [],
  };

  
  // console.log("here it is", ds)

  

  const createChart = (dataset: any) => {};

  return <>{/* <Bar data={datasets: trackAudioFeatues.audio_features} /> */
