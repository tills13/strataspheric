import { breakpoints, vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as iconButtonStyles from "../IconButton/style.css";
import { keyframes, style } from "@vanilla-extract/css";

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

export const outsideMessageWarning = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.red,
  color: vars.colors.white,
});

export const message = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
  },
});

export const highlightAnimation = keyframes({
  "25%": {
    backgroundColor: vars.colors.yellow500,
  },
  "100%": {
    backgroundColor: vars.colors.yellow100,
  },
});

export const messageHighighted = style([
  message,
  {
    animation: `${highlightAnimation} 1s ease forwards`,
  },
]);

export const messageHeader = style({
  position: "relative",
  padding: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

export const messageHeaderActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const messageHeaderSentAt = style({
  color: vars.colors.grey500,
});

export const chatActionButton = style([
  iconButtonStyles.iconButton,
  iconButtonStyles.iconButtonSizes.small,
  buttonStyles.buttonVariants.transparent,
  {
    position: "absolute",
    right: vars.spacing.normal,
    top: vars.spacing.normal,

    "@media": {
      [breakpoints.tablet]: {
        position: "relative",
        top: "unset",
        right: "unset",
      },
    },
  },
]);

export const messageSender = style({
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.grey500,
});

export const messageText = style({
  padding: vars.spacing.normal,
  paddingTop: 0,
  whiteSpace: "pre-wrap",
});

export const messageChatForm = style({});

export const newMessageForm = style({
  padding: vars.spacing.normal,
});

export const messageFile = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: vars.spacing.small,
  backgroundColor: "rgba(0, 0, 0, 0.05)",
});

export const messageFileAttachmentIcon = style({
  height: "24px",
  verticalAlign: "top",
});

export const modalBodyClassName = style({
  overflow: "hidden",
  display: "grid",
  gridTemplateRows: "auto min-content",
});
