import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

import { padding } from "../../theme";

export const badge = recipe({
  base: {
    fontSize: vars.fontSizes.small,
    height: vars.sizes.small,
    lineHeight: calc(vars.sizes.small).subtract("4px").toString(),
    padding: padding(0, vars.spacing.small),
    borderRadius: vars.borderRadius,
    borderStyle: "solid",
    borderWidth: 2,
  },

  variants: {
    level: {
      info: {
        borderColor: vars.colors.primary,
        backgroundColor: `color-mix(in srgb, black 8%, transparent)`,
        // background: `linear-gradient(-45deg, color-mix(in srgb, black 16%, transparent), color-mix(in srgb, black 8%, transparent) 25%)`,
      },
      error: {
        borderColor: vars.colors.red500,
        // background: `linear-gradient(-45deg, color-mix(in srgb, ${vars.colors.red500} 16%, transparent), color-mix(in srgb, ${vars.colors.red500} 8%, transparent))`,
        backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 8%, transparent)`,
        color: vars.colors.red900,
      },
      warning: {
        borderColor: vars.colors.orange500,
        backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 8%, transparent)`,
        color: vars.colors.orange900,
      },
      success: {
        borderColor: vars.colors.green500,
        backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 8%, transparent)`,
        color: vars.colors.green900,
      },
    },
  },

  defaultVariants: {
    level: "info",
  },
});
