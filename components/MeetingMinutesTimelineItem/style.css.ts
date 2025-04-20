import { style } from "@vanilla-extract/css";

export const meetingMinutesTimelineItem = style({
  position: "relative",
});

export const fileNameContainer = style({
  overflow: "hidden",
});

export const fileName = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});
