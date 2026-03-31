import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { recipe } from "@vanilla-extract/recipes";

import { colorMix } from "../../styles/utils";

function background(baseColor: string) {
  return `linear-gradient(-45deg, ${colorMix(baseColor, 32)}, ${colorMix(
    baseColor,
    8,
  )} 75%)`;
}

export const infoPanel = recipe({
  base: {
    borderRadius: vars.borderRadius.md,
    borderStyle: "solid",
    borderWidth: vars.borderWidth,
  },

  variants: {
    alignment: {
      center: {
        textAlign: "center",
      },
    },
    level: {
      default: {
        borderColor: vars.colors.primary,
        background: background(vars.colors.primary),
      },
      hint: {
        borderColor: vars.colors.borderDefault,
        background: background(vars.colors.grey200),
        color: vars.colors.grey500,
      },
      error: {
        borderColor: vars.colors.red500,
        background: background(vars.colors.red500),
        color: vars.colors.red900,
      },
      warning: {
        borderColor: vars.colors.orange500,
        background: background(vars.colors.orange500),
        color: vars.colors.orange900,
      },
      success: {
        borderColor: vars.colors.green500,
        background: background(vars.colors.green500),
        color: vars.colors.green900,
      },
    },
  },

  defaultVariants: {
    level: "default",
  },
});

export const infoPanelPadding = style({
  padding: vars.spacing["20"],
});
