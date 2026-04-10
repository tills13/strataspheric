import { vars } from "../../app/theme.css";

import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

import { colorMix } from "../../styles/utils";
import { padding } from "../../theme";

export const badge = recipe({
  base: {
    whiteSpace: "nowrap",
    height: vars.sizes.xs,
    lineHeight: calc(vars.sizes.xs).subtract(vars.borderWidth).toString(),
    padding: padding(0, vars.spacing.small),
    borderRadius: vars.borderRadius.sm,
    borderStyle: "solid",
    borderWidth: vars.borderWidth,
    fontSize: vars.fontSizes.xs,
    letterSpacing: vars.letterSpacing.wider,
    textTransform: "uppercase",
  },

  variants: {
    level: {
      default: {
        color: vars.colors.primary,
        borderColor: vars.colors.primary,
        background: `linear-gradient(-45deg, ${colorMix(
          vars.colors.grey500,
          32,
        )}, ${colorMix(vars.colors.grey500, 8)} 75%)`,
      },
      error: {
        borderColor: vars.colors.red500,
        background: `linear-gradient(-45deg, ${colorMix(
          vars.colors.red500,
          32,
        )}, ${colorMix(vars.colors.red500, 8)} 75%)`,
        color: vars.colors.red900,
      },
      warning: {
        borderColor: vars.colors.orange500,
        background: `linear-gradient(-45deg, ${colorMix(
          vars.colors.orange500,
          32,
        )}, ${colorMix(vars.colors.orange500, 8)} 75%)`,
        color: vars.colors.orange900,
      },
      success: {
        borderColor: vars.colors.green500,
        background: `linear-gradient(-45deg, ${colorMix(
          vars.colors.green500,
          32,
        )}, ${colorMix(vars.colors.green500, 8)} 75%)`,
        color: vars.colors.green900,
      },
    },
  },

  defaultVariants: {
    level: "default",
  },
});
