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
      color: '#fff',
      FontFace: "CircularSP",
      bg: "linear-gradient(rgb(33, 44, 57), rgb(18, 30, 61) 50%, rgb(0, 0, 0))",
      minHeight: '100vh',
      minWidth: '100vh'
    }
  })
}

const components = {
  Button
}

export const theme = extendTheme({colors, fonts, styles, components})
