import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const inboxMessageSubject = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const inboxThreadsTable = style({
  margin: 0,
});

export const unreadIndicator = style({
  width: vars.spacing.small,
  height: vars.spacing.small,
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.primary,
  flexShrink: 0,
});

export const unreadText = style({
  fontWeight: vars.fontWeights.bold,
});
