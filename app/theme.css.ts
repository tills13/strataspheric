import { createGlobalTheme } from "@vanilla-extract/css";

export const breakpoints = {
  tablet: "(min-width: 400px)",
};

export const fontFamilies = {
  primary: "var(--fonts-primary)",
  secondaryHeaer: "var(--fonts-secondaryHeader)",
  text: "var(--fonts-text)",
};

export const vars = createGlobalTheme(":root", {
  borderRadius: "0px",

  spacing: {
    xs: "4px",
    small: "8px",
    normal: "16px",
    large: "32px",
    xl: "64px",
  },

  sizes: {
    small: "32px",
    normal: "40px",
  },

  fontSizes: {
    small: "12px",
    normal: "16px",
    large: "24px",
    xl: "32px",
    xxl: "48px",
  },

  fontWeights: {
    light: "200",
    normal: "400",
    bold: "700",
  },

  colors: {
    white: "#fff",
    // white_rgb

    black: "#000",
    // black_rgb

    grey100: "#f5f6fa",
    grey200: "#e3e7ee",
    grey300: "#d4d9e2",
    grey400: "#abb6c8",
    grey500: "#6a7990",
    grey600: "#495261",
    grey700: "#272b33",
    grey750: "#1c2027",
    grey800: "#111419",
    grey900: "#121418",

    globalBg: "#fff",

    primary: "#2c333d",
    primaryHover: "#454f5e",

    secondary: "#393e46",
    secondaryHover: "#494f58",
    // tertiary: "#3e4550"
  },

  fontColors: {
    primary: "#111419",
    secondary: "#acacac",
    tertiary: "#8b8b8b",
    primaryInverse: "#111419",
  },

  fontFamilies: {
    primary: "var(--fonts-primary)",
    secondaryHeader: "var(--fonts-secondaryHeader)",
    text: "var(--fonts-text)",
  },

  states: {
    default: "#073b4c",
    hint: "#00000057",
    info: "#1f4b5a",
    error: "#ef476f",
    success: "#06d6a0",
    warning: "#ffd470",
  },

  zIndex: {
    front: "100",
    header: "101",
  },
});
