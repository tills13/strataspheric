import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

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

export const message = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
  },
});

export const messageHeader = style({
  padding: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

export const messageHeaderSentAt = style({
  color: vars.colors.grey500,
});

export const messageSender = style({
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.grey500,
});

export const messageText = style({
  padding: vars.spacing.normal,
  paddingTop: 0,
  whiteSpace: "pre-wrap",
});

export const messageChatForm = style({
  padding: vars.spacing.normal,
});

export const newMessageForm = style({
  padding: vars.spacing.normal,
});

export const messageFile = style({
  padding: vars.spacing.small,
  backgroundColor: "rgba(0, 0, 0, 0.05)",
});

export const messageFileAttachmentIcon = style({
  height: "24px",
  verticalAlign: "top",
});
