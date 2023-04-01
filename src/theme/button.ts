import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontWeight: 500,
    fontFamily: `'CircularSP black', sans-serif`,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "#1ed760",
      fontSize: "16pt",
      _hover: {
        bg: "#19b551",
      },
    },
  },
};
