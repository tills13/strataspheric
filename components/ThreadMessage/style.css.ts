import { breakpoints, iconColorVar, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

export const message = style({
  paddingTop: vars.spacing.normal,
  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
  },
});

export const highlightAnimation = keyframes({
  "25%": {
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 60%, transparent)`,
  },
  "100%": {
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 30%, transparent)`,
  },
});

export const messageHighighted = style([
  message,
  {
    transition: "background-color 1s ease",
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 30%, transparent)`,
    // animation: `${highlightAnimation} 1s ease forwards`,
  },
]);

export const messageHeader = style({
  position: "relative",
  padding: padding(0, vars.spacing.normal),
  marginBottom: vars.spacing.normal,
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

export const chatActionButton = style({
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
});

export const messageSender = style({
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.grey500,
});

export const messageText = style({
  padding: padding(0, vars.spacing.normal),
  marginBottom: vars.spacing.normal,
  whiteSpace: "pre-wrap",
});

export const messageInvoice = style({
  paddingLeft: vars.spacing.normal,
  paddingRight: vars.spacing.normal,
  marginBottom: vars.spacing.normal,
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
