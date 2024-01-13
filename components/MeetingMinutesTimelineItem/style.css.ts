import { iconColorVar, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const meetingMinutesTimelineItem = style({
  position: "relative",
  top: vars.spacing.small,
});

export const header = style({
  height: vars.sizes.small,
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
});

export const fileName = style({
  lineHeight: vars.sizes.small,
  fontWeight: vars.fontWeights.bold,
});

export const headerActions = style({
  display: "flex",
  alignContent: "center",
  gap: vars.spacing.small,
});
