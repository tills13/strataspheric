import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const wrapper = style({
  position: "relative",
  overflow: "hidden",
  borderLeft: border("1px", "solid", vars.colors.borderDefault),
});

export const chatsContainer = style({
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      height: "100%",
      overflow: "hidden",
    },
  },
});

export const chatsHeader = style({});

export const chatStream = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  overflow: "auto",
});

export const chatBubble = style({
  display: "flex",
  flexDirection: "column",
  // gap: vars.spacing.normal,
  // padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey100,
  color: vars.colors.grey700,
  borderRadius: vars.borderRadius,
});

export const selfChatBubble = style([
  chatBubble,
  {
    backgroundColor: vars.colors.grey700,
    color: vars.colors.white,
  },
]);

export const chatBubbleTimestamp = style({
  fontSize: vars.fontSizes.small,
  opacity: 0.5,
});

export const quotedMessageIcon = style({
  position: "absolute",
  verticalAlign: "middle",
  height: "64px",
  opacity: 0.1,
  left: 0,
  top: 0,
});

export const quotedMessageTimestamp = style([chatBubbleTimestamp]);

export const quotedMessage = style({
  position: "relative",
  padding: vars.spacing.normal,
  marginBottom: vars.spacing.normal,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  selectors: {
    [`${chatBubble} &`]: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    [`${selfChatBubble} &`]: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
});

export const chatBubbleHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.spacing.normal,
  selectors: {
    [`${quotedMessage} &`]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
    },
  },
});

export const chatMessage = style({
  padding: `0 ${vars.spacing.normal} ${vars.spacing.normal}`,
});

export const chatFile = style({
  borderBottomLeftRadius: vars.borderRadius,
  borderBottomRightRadius: vars.borderRadius,
  padding: vars.spacing.small,

  selectors: {
    [`${chatBubble} &`]: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    [`${selfChatBubble} &`]: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
});

export const chatFileAttachmentIcon = style({
  height: "24px",
  verticalAlign: "top",
});
