import { vars } from "./app/theme.css";

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

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
  },
  shorthands: {
    mb: ["marginBottom"],
  },
});

export const s = createSprinkles(marginProperties);
