import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#dbe0e0", "#000000")(props),
        fontFamily: `Quicksand, sans-serif;`,
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  components: {
    Button: {
      variants: {
        submit: {
          bg: "#008000",
          _hover: {
            bg: "#005900",
          },
        },
        default: {
          bg: "#8D858E",
          _hover: {
            bg: "#625D63",
          },
          _dark: {
            bg: "#413543",
            _hover: {
              bg: "#2D252E",
            },
          },
        },
        negative: {
          bg: "#CC0000",
          _hover: {
            bg: "#7F0000",
          },
        },
      },
    },

    Link: {
      variants: {
        navbar: {
          _hover: {
            color: "#F0EB8D",
            textDecoration: "none",
            fontWeight: "bold",
          },
          _activeLink: {
            color: "#F0EB8D",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "#8D858E",
          borderColor: "#8D858E",
          borderWidth: 1,
          _focus: {
            borderColor: "#2D252E",
            bg: "#dbe0e0",
          },
          _dark: {
            bg: "#413543",
            borderColor: "#413543",
            _focus: {
              bg: "#000000",
              borderColor: "#625D63",
            },
          },
        },
      },
      defaultProps: {
        variant: null,
      },
    },
  },
});

export default extendTheme(theme);
