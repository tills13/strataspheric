import { breakpoints, iconColorVar, vars } from "../../app/theme.css";
import { colorVar } from "../Wordmark/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const footer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  borderTop: border("1px", "solid", vars.colors.borderDefault),

  backgroundColor: vars.colors.primary,
  color: vars.colors.white,

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "unset",
      color: "unset",
    },
  },
});

export const footerWordMark = style({
  display: "block",
  textDecoration: "none",
  vars: {
    [colorVar]: vars.colors.white,
  },
  "@media": {
    [breakpoints.tablet]: {
      vars: {
        [colorVar]: vars.colors.primary,
      },
    },
  },
});

export const heartIcon = style({
  vars: { [iconColorVar]: vars.colors.red500 },
});
