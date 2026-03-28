import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const inboxMessagesNoMessages = style({
  marginTop: vars.spacing.xl,
  padding: vars.spacing.normal,
  textAlign: "center",
});

export const inboxMessageSubject = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const inboxThreadsTable = style({
  margin: 0,
  "@media": {
    [breakpoints.tablet]: {
      marginLeft: vars.spacing.normal,
      marginRight: vars.spacing.normal,
    },
  },
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
