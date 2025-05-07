import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { border } from "../../../../../theme";

export const threadPageContainerWithChats = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
    },
  },
});

export const inboxMessageThreadContainer = style({
  paddingBottom: vars.spacing.normal,
  overflowY: "auto",
});

export const inboxMessageThreadBackNavigationButton = style({
  marginTop: "6px",
});

export const pageHeader = style({
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
});

export const outsideMessageWarning = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.red500,
  color: vars.colors.white,
});

export const chatPanelWrapper = style({
  borderLeft: "1px solid " + vars.colors.borderDefault,
  overflow: "hidden",
});

export const chatPanelContents = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateRows: "min-content min-content auto min-content",
      position: "sticky",
      top: 0,
      overflow: "scroll",
      height: calc("100vh")
        .subtract("57px")
        .subtract(calc(vars.spacing.normal).multiply(2))
        .toString(),
    },
  },
});
