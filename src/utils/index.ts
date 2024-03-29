import { FastAverageColor } from "fast-average-color";

// get query params from the window'w URL
export const getHashParams = () => {
  const hashParams: any = {};
  let e: string[] | null;
  const regex = /([^&;=]+)=?([^&;]*)/g;
  const query = window.location.hash.substring(1);
  while ((e = regex.exec(query))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
};

// Format milliseconds into minutes and seconds
export const formatDurationToMinsAndSecs = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds: number = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// get dominant color from profile image
const fac = new FastAverageColor();

export const getDominantColor = async (imageURL: string) => {
  try {
    const response = await fac.getColorAsync(imageURL);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

// place ellipsis on long strings at a certain length
export const formatStringEllipsis = (text: string, length: number) => {
  if (text.length < length) {
    return text;
  } else {
    return `${text.slice(0, length)}...`;
  }
};

// get average from an array
export const getArrayAverage = (array: number[]) =>
  array.reduce((a, b) => a + b, 0) / array.length;
