import { createGlobalTheme, createVar } from "@vanilla-extract/css";

export const breakpoints = {
  tablet: "(min-width: 640px)",
  desktop: "(min-width: 1200px)",
};

export const fontHeader = createVar();
export const fontPrimary = createVar();
// export const fontSecondary = createVar();
// export const fontText = createVar();

export const vars = createGlobalTheme(":root", {
  borderRadius: "4px",

  spacing: {
    xxs: "4px",
    xs: "4px",
    small: "8px",
    normal: "16px",
    large: "32px",
    xl: "64px",
  },

  sizes: {
    xs: "24px",
    small: "32px",
    normal: "40px",
    large: "48px",
    xl: "56px",
    xxl: "64px",
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

    red: "#f00",
    green: "#0f0",

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

    borderDefault: "#e3e7ee",
    borderDefaultHover: "#d4d9e2",
  },

  fontColors: {
    primary: "#495261",
    secondary: "#acacac",
    tertiary: "#8b8b8b",
    primaryInverse: "#111419",
  },

  fontFamilies: {
    primary: fontPrimary,
    secondaryHeader: fontHeader,
    primaryHeader: fontHeader,
    text: fontPrimary,
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
