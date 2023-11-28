import { breakpoints, vars } from "../../app/theme.css";
import * as iconStyles from "../Icon/style.css";
import { colorVar } from "../Wordmark/style.css";
import { style } from "@vanilla-extract/css";

import { border, important } from "../../theme";

export const footer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  borderTop: border("1px", "solid", vars.colors.borderDefault),

  backgroundColor: vars.colors.grey700,
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
  marginBottom: vars.spacing.normal,
  vars: {
    [colorVar]: vars.colors.white,
  },
  "@media": {
    [breakpoints.tablet]: {
      vars: {
        [colorVar]: vars.colors.grey700,
      },
    },
  },
});

export const footerLinks = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.spacing.normal,
  marginBottom: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {},
  },
});

export const madeWith = style({
  whiteSpace: "nowrap",
});

export const heartIcon = style([
  iconStyles.icon,
  {
    position: "relative",
    height: vars.sizes.small,
    fill: vars.colors.red,
    verticalAlign: "middle",
  },
]);
