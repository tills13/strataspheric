import { vars } from "../../app/theme.css";
import * as chatBubbleStyles from "../InboxThreadChats/style.css";
import { style } from "@vanilla-extract/css";

export const quotedMessageIcon = style({
  position: "absolute",
  verticalAlign: "middle",
  height: "64px",
  opacity: 0.1,
  left: 0,
  top: 0,
});

export const quotedMessageTimestamp = style([
  chatBubbleStyles.chatBubbleTimestamp,
]);

export const quotedMessage = style({
  position: "relative",
  padding: vars.spacing.normal,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  overflow: "hidden",

  display: "grid",
  gridTemplateRows: "min-content auto",
  gap: vars.spacing.normal,

  selectors: {
    [`${chatBubbleStyles.chatBubble} &`]: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    [`${chatBubbleStyles.selfChatBubble} &`]: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
});

export const quotedMessageHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const quotedMessageMessage = style({
  whiteSpace: "pre-wrap",
  overflow: "auto",
});
