import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "520px",
  md: "768px",
  lg: "920px",
  xl: "1200px",
});

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode("#f0f2f5", "#18191a")(props),
      color: mode("#000", "#f5f6f7")(props),
      fontSize: "16px",
    },
    a: {
      _focus: {
        boxShadow: "0 0 0 2px #000 !important",
      },
    },
    button: {
      _focus: {
        "&:not(:focus-visible)": {
          boxShadow: "none",
        },
      },
    },
  }),
};

const theme = extendTheme({
  breakpoints,
  styles,
  colors: {
    primary: "#da0b2f",
    secondary: "#0f3460",
    bg: "#f0f2f5",
    darkBg: "#18191a",
    surfaceDarkBg: "#0c0c0c",
    popupDarkBg: "#3a3b3c",
    inputDarkBg: "#2e2f30",
    light: "#f5f6f7",
    link: "#007bff",
    errorLight: "#d40505",
    errorDark: "#fc8181",
    darkBorder: "rgba(0, 0, 0, .3)",
  },
});

export default theme;
