import { iconColorVar, vars } from "../../app/theme.css";
import { selfChatBubble } from "../InboxThreadChats/style.css";
import { timelineEntry } from "../StrataActivityTimeline/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const fileAttachmentChip = style({
  backgroundColor: vars.surfaces.sunken,
  border: border(vars.borderWidth, "solid", vars.surfaces.sunken),
  alignItems: "center",
  height: vars.sizes.normal,
  color: "inherit",
  borderRadius: vars.borderRadius.md,
  overflow: "hidden",

  selectors: {
    [`${selfChatBubble} &, ${timelineEntry} &`]: {
      width: "100%",
      backgroundColor: vars.colors.grey800,
      borderColor: vars.colors.grey800,
      vars: {
        [iconColorVar]: vars.colors.white,
      },
    },
  },
});

export const icon = style({
  height: vars.sizes.xs,
  verticalAlign: "top",
  flexShrink: 0,
});

export const name = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});
