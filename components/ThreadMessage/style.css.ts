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
    backgroundColor: vars.colors.orange500,
  },
  "100%": {
    backgroundColor: vars.colors.orange100,
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

export const invoiceHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.spacing.normal,
});

export const invoiceBody = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const invoiceDescription = style({
  flex: 1,
});

export const invoiceAmountContainer = style({
  fontSize: vars.fontSizes.large,
  padding: padding(vars.spacing.small, vars.spacing.normal),
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey100,
  textAlign: "center",
});

export const invoiceHeaderStatus = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const invoiceStatusIcon = style({
  height: "24px",
  vars: {
    [iconColorVar]: vars.colors.green500,
  },
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
