import '../fonts/CircularSP/CircularSpotifyText-Black.otf';
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

const colors = {
  brand: {
    900: "#1ed760",
    800: "",
    700: "",
  },
};

const fonts = {
  body: `'CircularSP black', sans-serif`,
}

const styles = {
  global: () => ({
    body: {
      bg: '#01110A',
      color: '#fff',
      FontFace: "CircularSP"
    }
  })
}

const components = {
  Button
}

export const theme = extendTheme({colors, fonts, styles, components})
