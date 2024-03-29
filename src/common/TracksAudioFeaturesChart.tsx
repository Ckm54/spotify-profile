//

import { Box } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { TrackAudioFeaturesType } from "../../types";
import { AUDIO_PROPERTIES } from "../constants";
import { getArrayAverage } from "../utils";

type TracksAudioFeaturesChartProps = {
  trackAudioFeatures: TrackAudioFeaturesType;
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
      fontColor: "#ffffff",
      padding: 30,
      borderTopRadius: 20,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.3)",
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
            color: "rgba(255, 255, 255, 0.3)",
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

export default function TrackAudioFeaturesChart({
  trackAudioFeatures,
}: TracksAudioFeaturesChartProps) {
  const [chartData, setChartData] = React.useState<number[]>();
  const [labels, setLabels] = React.useState<string[]>([]);

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
    const ds = createDataset(trackAudioFeatures.audio_features);

    setLabels(Object.keys(ds));
    setChartData(Object.values(ds));

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
  }, [trackAudioFeatures]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(104, 132, 245, 0.3)",
          "rgba(153, 102, 255, 0.3)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(104, 132, 245, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box width={{ base: "100%" }} height={{ base: 300, md: 400 }}>
      <Bar width={"100%"} height={"100%"} options={options} data={data} />
      {/* <Doughnut data={data} /> */}
    </Box>
  );
}
