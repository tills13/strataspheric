import { breakpoints, vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const meetingLayoutContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
      overflow: "hidden",
    },
  },
});

export const meetingAgendaContainer = style({
  padding: vars.spacing.normal,
});

export const meetingTimelineSearchContainer = style({
  overflow: "auto",
  padding: vars.spacing.normal,
});

export const timeline = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  //   gridAutoRows: 200,
  //   gap: vars.spacing.normal,
});

export const header = style({
  position: "relative",
  marginBottom: vars.spacing.large,
});

export const headerHeader = style({
  marginBottom: vars.spacing.small,
});

export const editMeetingButton = style({
  float: "right",
  clear: "both",
  // position: "absolute",
  // right: 0,
  // top: 0,
});

export const meetingAgendaList = style({
  listStyle: "none",
});
