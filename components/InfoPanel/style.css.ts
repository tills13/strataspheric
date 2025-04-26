import { vars } from "../../app/theme.css";

import { recipe } from "@vanilla-extract/recipes";

export const infoPanel = recipe({
  base: {
    padding: vars.spacing.normal,
    borderRadius: vars.borderRadius,
    borderStyle: "solid",
    borderWidth: 2,
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
        background: `linear-gradient(-45deg, color-mix(in srgb, ${vars.colors.grey500} 32%, transparent), color-mix(in srgb, ${vars.colors.grey500} 8%, transparent) 75%)`,
      },
      error: {
        borderColor: vars.colors.red500,
        background: `linear-gradient(-45deg, color-mix(in srgb, ${vars.colors.red500} 32%, transparent), color-mix(in srgb, ${vars.colors.red500} 8%, transparent) 75%)`,
        color: vars.colors.red900,
      },
      warning: {
        borderColor: vars.colors.orange500,
        background: `linear-gradient(-45deg, color-mix(in srgb, ${vars.colors.orange500} 32%, transparent), color-mix(in srgb, ${vars.colors.orange500} 8%, transparent) 75%)`,
        color: vars.colors.orange900,
      },
      success: {
        borderColor: vars.colors.green500,
        background: `linear-gradient(-45deg, color-mix(in srgb, ${vars.colors.green500} 32%, transparent), color-mix(in srgb, ${vars.colors.green500} 8%, transparent) 75%)`,
        color: vars.colors.green900,
      },
    },
  },

  defaultVariants: {
    level: "default",
  },
});
