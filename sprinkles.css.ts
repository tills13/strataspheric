import { vars } from "./app/theme.css";

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const fontProperties = defineProperties({
  properties: {
    color: {
      primary: vars.fontColors.primary,
      secondary: vars.fontColors.secondary,
      tertiary: vars.fontColors.tertiary,
    },
    fontFamily: {
      primary: vars.fontFamilies.primary,
      primaryHeader: vars.fontFamilies.primaryHeader,
      secondaryHeader: vars.fontFamilies.secondaryHeader,
      text: vars.fontFamilies.text,
    },
    fontWeight: {
      bold: vars.fontWeights.bold,
      light: vars.fontWeights.light,
      normal: vars.fontWeights.normal,
      xbold: vars.fontWeights.xbold,
    },

    fontSize: {
      large: vars.fontSizes.large,
      larger: vars.fontSizes.larger,
      normal: vars.fontSizes.normal,
      small: vars.fontSizes.small,
      xl: vars.fontSizes.xl,
      xxl: vars.fontSizes.xxl,
    },
  },
  shorthands: {
    fc: ["color"],
    ff: ["fontFamily"],
    fw: ["fontWeight"],
    fs: ["fontSize"],
  },
});

const sizeProperties = defineProperties({
  properties: {
    width: {
      xxs: vars.sizes.xxs,
      xs: vars.sizes.xs,
      small: vars.sizes.small,
      normal: vars.sizes.normal,
      large: vars.sizes.large,
      xl: vars.sizes.xl,
      xxl: vars.sizes.xxl,
      xxl2: vars.sizes.xxl2,
      xxl3: vars.sizes.xxl3,
      xxl4: vars.sizes.xxl4,
      full: "100%",
    },
    height: {
      xxs: vars.sizes.xxs,
      xs: vars.sizes.xs,
      small: vars.sizes.small,
      normal: vars.sizes.normal,
      large: vars.sizes.large,
      xl: vars.sizes.xl,
      xxl: vars.sizes.xxl,
      xxl2: vars.sizes.xxl2,
      xxl3: vars.sizes.xxl3,
      xxl4: vars.sizes.xxl4,
      full: "100%",
    },
  },
  shorthands: {
    w: ["width"],
    h: ["height"],
  },
});

export const flexProperties = defineProperties({
  properties: {
    flex: {
      1: "1",
    },
  },
});

const paddingProperties = defineProperties({
  properties: {
    padding: {
      "0": 0,
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    paddingBottom: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    paddingTop: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    paddingLeft: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    paddingRight: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
  },
  shorthands: {
    p: ["padding"],
    pb: ["paddingBottom"],
    ph: ["paddingLeft", "paddingRight"],
    pv: ["paddingTop", "paddingBottom"],
  },
});

const marginProperties = defineProperties({
  properties: {
    marginBottom: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    marginTop: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    marginLeft: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
    marginRight: {
      xxs: vars.spacing.xxs,
      xs: vars.spacing.xs,
      small: vars.spacing.small,
      normal: vars.spacing.normal,
      large: vars.spacing.large,
      xl: vars.spacing.xl,
      xxl: vars.spacing.xxl,
    },
  },
  shorthands: {
    mb: ["marginBottom"],
    mt: ["marginTop"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mv: ["marginTop", "marginBottom"],
    mh: ["marginLeft", "marginRight"],
  },
});

export const s = createSprinkles(
  marginProperties,
  paddingProperties,
  sizeProperties,
  fontProperties,
  flexProperties,
);

export type S = Parameters<typeof s>[0];
