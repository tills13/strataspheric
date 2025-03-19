import { iconColorVar, vars } from "../../app/theme.css";
import { selfChatBubble } from "../InboxThreadChats/style.css";
import { timelineEntry } from "../MeetingTimelineItem/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const fileAttachmentChip = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: `0 ${vars.spacing.small}`,
  backgroundColor: vars.colors.grey50,
  border: border("2px", "solid", vars.colors.grey50),
  alignItems: "center",
  height: vars.sizes.normal,
  color: "inherit",
  borderRadius: vars.borderRadius,

  selectors: {
    [`${selfChatBubble} &, ${timelineEntry} &`]: {
      width: "100%",
      backgroundColor: vars.colors.grey800,
      borderColor: vars.colors.grey800,
      vars: {
        [iconColorVar]: vars.colors.white,
      },
    },
    // [``]: {
    //   width: "100%",
    //   backgroundColor: vars.colors.grey800,
    //   borderColor: vars.colors.grey800,
    //   vars: {
    //     [iconColorVar]: vars.colors.white,
    //   },
    // },
  },
});

export const icon = style({
  height: "24px",
  verticalAlign: "top",
  flexShrink: 0,
});

export const name = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});
