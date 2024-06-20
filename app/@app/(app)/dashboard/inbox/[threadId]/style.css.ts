import { breakpoints, vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../../../../theme";

export const threadPageContainer = style({
  overflow: "hidden",
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
    },
  },
});

export const inboxMessageThreadContainer = style({
  paddingBottom: vars.spacing.normal,
  overflow: "auto",
});

export const pageHeader = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.normal,
  borderBottom: border("1px", "solid", vars.colors.borderDefault),

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
});

export const pageHeaderActions = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing.normal,
  // lineHeight: vars.sizes.small,

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "unset",
    },
  },
});

export const pageHeaderSubject = style({
  marginBottom: vars.spacing.small,
  lineHeight: vars.fontSizes.large,
  fontSize: vars.fontSizes.large,
  fontWeight: vars.fontWeights.bold,
});

export const pageHeaderSender = style({
  color: vars.colors.grey500,
});

export const outsideMessageWarning = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.red500,
  color: vars.colors.white,
});

export const chatPanelWrapper = style({
  borderLeft: "1px solid " + vars.colors.borderDefault,
  minHeight: "100%",
  overflow: "hidden",
});
