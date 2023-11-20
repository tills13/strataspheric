import { breakpoints, vars } from "../../app/theme.css";
import { colorVar } from "../Wordmark/style.css";
import { style } from "@vanilla-extract/css";

import { border, important, variable } from "../../theme";

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
  gap: vars.spacing.small,
  marginBottom: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {},
  },
});

export const madeWith = style({
  whiteSpace: "nowrap",
});

export const heartIcon = style({
  position: "relative",
  height: "1em",
  fill: important(vars.colors.red),
  verticalAlign: "middle",
});

export const continuePanel = style({
  color: vars.fontColors.primary,
  "@media": {
    [breakpoints.tablet]: {
      width: 400,
    },
  },
});

export const continuePanelHeader = style({
  marginBottom: vars.spacing.normal,
});

export const continuePanelList = style({});
export const continuePanelListButton = style({
  width: "100%",
});
