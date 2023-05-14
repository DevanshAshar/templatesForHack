import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#FFFFFF", "#000000")(props),
        fontFamily: `Quicksand, sans-serif;`,  
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    bg: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    primary: {
      dark: "#241f1f",
      light: "#a0a0a0",
    },
    secondary: {
      dark: "#1d2410",
      light: "#6c873c",
    },
    highlight: "#e5dc36",
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
      defaultProps: {
        variant: "default",
      },
    },

    Link: {
      variants: {
        navbar: {
          _hover: {
            // color:"#F0EB8D",
            color: "#e5dc36",
            fontWeight: "bolder",
            textDecoration: "none",
          },
          _active: {
            // color:"#F0EB8D",
            color: "#e5dc36",
            fontWeight: "bolder",
            textDecoration: "none",
          },
          _dark: {
            _hover: {
              color: "#e5dc36",
              fontWeight: "bold",
              textDecoration: "none",
            },
            _active: {
              color: "#e5dc36",
              fontWeight: "bolder",
              textDecoration: "none",
            },
          },
        },
        normalLinkWithUnderline: {
          textDecoration: "underline",
          color: mode("#e5dc36", "#F0EB8D"),
          _hover: {
            fontWeight: "bolder",
          },
          _dark: {
            _hover: {
              fontWeight: "bold",
            },
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
