import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../app/theme.css";
import { border, important, variable } from "../../theme";
import { colorVar } from "../Wordmark/style.css";

export const footer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  borderTop: border("1px", "solid", vars.colors.borderDefault),
  paddingBottom: `calc(112px + ${vars.spacing.normal})`,

  backgroundColor: vars.colors.grey700,
  color: vars.colors.white,

  "@media": {
    [breakpoints.tablet]: {
      paddingBottom: vars.spacing.normal,
      backgroundColor: "unset",
      color: "unset",
    },
  },
});

export const footerWordMark = style({
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
  gap: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {},
  },
});

export const madeWith = style({
  whiteSpace: "nowrap",
});

export const heartIcon = style({
  position: "relative",
  height: "0.9em",
  fill: important(vars.colors.red),
});
