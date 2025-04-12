import { vars } from "./app/theme.css";

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const fontProperties = defineProperties({
  properties: {
    color: {
      primary: vars.fontColors.primary,
      secondary: vars.fontColors.secondary,
      tertiary: vars.fontColors.tertiary,
    },
  },
});

const sizeProperties = defineProperties({
  properties: {
    width: {
      full: "100%",
    },
    height: {
      xs: vars.sizes.xs,
      small: vars.sizes.small,
      normal: vars.sizes.normal,
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
