import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const inboxThreadChatsContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "contents",
    },
  },
});

export const chatStream = style({
  "@media": {
    [breakpoints.tablet]: {
      overflowY: "auto",
      minHeight: 0,
    },
  },
});

export const chatMessageGroup = style({
  marginRight: vars.spacing.normal,
  marginLeft: 0,
});

export const chatSelfMessageGroup = style({
  marginRight: 0,
  marginLeft: vars.spacing.normal,
});

export const chatBubble = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.surfaces.sunken,
  color: vars.colors.grey700,
  borderRadius: vars.borderRadius.lg,
});

export const selfChatBubble = style([
  chatBubble,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
  },
]);
