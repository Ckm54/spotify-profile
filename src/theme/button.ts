import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "50px",
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
      fontSize: "12pt",
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
    outline: {
      color: '#fff',
      borderWidth: 2,
      _hover: {
        bg: 'transparent',
        borderColor: '#1ed760',
        color: '#1ed760'
      }
    }
  },
};
