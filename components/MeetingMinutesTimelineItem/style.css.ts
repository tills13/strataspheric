import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const meetingMinutesTimelineItem = style({
  position: "relative",
});

export const header = style({
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
      justifyContent: "space-between",
      gap: vars.spacing.normal,
      alignContent: "center",
    },
  },
});

export const fileName = style({
  display: "block",
  lineHeight: vars.sizes.small,
  fontWeight: vars.fontWeights.bold,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const headerActions = style({
  display: "flex",
  alignContent: "center",
  gap: vars.spacing.small,
});
