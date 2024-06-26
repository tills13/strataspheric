import { iconColorVar, vars } from "../../app/theme.css";
import { timelineAttachment } from "../MeetingTimelineItem/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const fileAttachmentChip = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: vars.spacing.small,
  backgroundColor: vars.colors.grey50,
  border: border("2px", "solid", vars.colors.grey50),
  height: vars.sizes.normal,
  color: "inherit",
  borderRadius: vars.borderRadius,

  selectors: {
    [`${timelineAttachment}&`]: {
      width: "100%",
      backgroundColor: vars.colors.grey800,
      borderColor: vars.colors.grey800,
      borderRadius: 0,
      vars: {
        [iconColorVar]: vars.colors.white,
      },
    },
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
});
