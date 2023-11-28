import { breakpoints, vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as iconButtonStyles from "../IconButton/style.css";
import { style } from "@vanilla-extract/css";

export const continuePanel = style({
  display: "flex",
  flexDirection: "column",
  color: vars.fontColors.primary,
  "@media": {
    [breakpoints.tablet]: {
      width: 400,
    },
  },
});

export const spacer = style({
  flex: 1,
});

export const continuePanelHeader = style({
  marginBottom: vars.spacing.normal,
});

export const continuePanelList = style({});
export const continueAction = style({
  flex: 1,
  width: "100%",
  textDecoration: "none",
});

export const continueActionOverflow = style({
  flexShrink: 0,
});
