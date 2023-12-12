import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const wrapper = style({
  display: "grid",
  gridTemplateRows: "auto min-content",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,

  overflow: "hidden",
});

export const chatsContainer = style({
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

export const chatBubbleHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.spacing.normal,
});

export const chatMessage = style({
  padding: `0 ${vars.spacing.normal} ${vars.spacing.normal}`,
  whiteSpace: "pre-line",
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

export const quotedMessage = style({
  marginBottom: vars.spacing.normal,
});
