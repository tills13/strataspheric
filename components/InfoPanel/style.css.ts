import { vars } from "../../app/theme.css";

import { recipe } from "@vanilla-extract/recipes";

export const infoPanel = recipe({
  base: {
    padding: vars.spacing.normal,
    borderRadius: vars.borderRadius,
    borderStyle: "solid",
    borderWidth: 1,
  },

  variants: {
    alignment: {
      center: {
        textAlign: "center",
      },
    },
    level: {
      info: {
        borderColor: vars.colors.primary,
        backgroundColor: `color-mix(in srgb, black 8%, transparent)`,
      },
      error: {
        borderColor: vars.colors.red500,
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
});
