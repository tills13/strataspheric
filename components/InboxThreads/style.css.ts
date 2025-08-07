import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const inboxMessagesNoMessages = style({
  marginTop: 100,
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
