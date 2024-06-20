import { createGlobalTheme, createVar } from "@vanilla-extract/css";

export const breakpoints = {
  tablet: "(min-width: 640px)",
  desktop: "(min-width: 1200px)",
};

export const iconColorVar = createVar();
export const fontHeaderVar = createVar();
export const fontPrimaryVar = createVar();
// export const fontSecondaryVar = createVar();
// export const fontTextVar = createVar();

export const vars = createGlobalTheme(":root", {
  borderRadius: "4px",

  spacing: {
    xxs: "2px",
    xs: "4px",
    small: "8px",
    normal: "16px",
    large: "32px",
    xl: "64px",
    xxl: "128px",
  },

  // padding: {
  //   xs: "4px",
  //   small: "8px",
  //   normal: `${this.spacing.small} ${vars.spacing.normal}`,
  //   large: "32px",
  //   xl: "64px",
  // },

  sizes: {
    xxs: "16px",
    xs: "24px",
    small: "32px",
    normal: "44px",
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
    xbold: "900",
  },

  colors: {
    white: "#fff",

    black: "#000",

    red100: "#E34141",
    red300: "#CA3636",
    red500: "#B12A2A",
    red700: "#981F1F",
    red900: "#7F1313",

    green100: "#A0C99C",
    green300: "#8CB988",
    green500: "#78A973",
    green700: "#64995F",
    green900: "#50894A",

    orange100: "#FFC778",
    orange300: "#F9B75A",
    orange500: "#F3A73C",
    orange700: "#EC961E",
    orange900: "#E68600",

    grey50: "#F8F8F8",
    grey100: "#F2F3F3",
    grey200: "#D6D7D8",
    grey300: "#BABCBC",
    grey400: "#9EA0A1",
    grey500: "#828586",
    grey600: "#66696A",
    grey700: "#4A4D4F",
    grey800: "#2E3233",
    grey900: "#121618",

    primary: "#1F2526",
    primaryHover: "#181C1D",

    secondary: "#393e46",
    secondaryHover: "#494f58",

    borderDefault: "#EAEDEE",
    borderDefaultHover: "#D5DCDD",
  },

  fontColors: {
    primary: "#1F2526",
    primaryHover: "#181C1D",
    secondary: "#66696A",
    tertiary: "#6E8387",
    primaryInverse: "#D5DCDD",
  },

  fontFamilies: {
    primary: fontPrimaryVar,
    secondaryHeader: fontHeaderVar,
    primaryHeader: fontHeaderVar,
    text: fontPrimaryVar,
  },

  // states: {
  //   default: "#073b4c",
  //   hint: "#00000057",
  //   info: "#1f4b5a",
  //   error: "#ef476f",
  //   success: "#06d6a0",
  //   warning: "#ffd470",
  // },

  zIndex: {
    front: "100",
    header: "101",
  },
});
