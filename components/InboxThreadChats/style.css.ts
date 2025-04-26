import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

const chatsContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      height: "100%",
      overflow: "hidden",
    },
  },
});

export const chatBubble = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.colors.grey100,
  color: vars.colors.grey700,
  borderRadius: vars.borderRadius,
});

export const selfChatBubble = style([
  chatBubble,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
  },
]);

const chatMessage = style({
  whiteSpace: "pre-line",
});
