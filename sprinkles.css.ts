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

const widthProperties = defineProperties({
  properties: {
    width: {
      full: "100%",
    },
  },
  shorthands: {
    w: ["width"],
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
  },
  shorthands: {
    p: ["padding"],
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
  },
  shorthands: {
    mb: ["marginBottom"],
    mt: ["marginTop"],
    mv: ["marginTop", "marginBottom"],
  },
});

export const s = createSprinkles(
  marginProperties,
  paddingProperties,
  widthProperties,
  fontProperties,
);
