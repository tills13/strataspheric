import { breakpoints, vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

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
  // position: "sticky",
  // top: 0,
  padding: vars.spacing.normal,
});

export const meetingTimelineSearchContainer = style({
  overflow: "auto",
  padding: vars.spacing.normal,
  // height: `calc(100vh - 81px - 49px)`,
});

export const header = style({
  position: "relative",
});

export const headerHeader = style({
  marginBottom: vars.spacing.small,
});

export const editMeetingButton = style({
  float: "right",
  clear: "both",
});

export const meetingAgendaList = style({
  listStyle: "none",
});

export const minutesUrlInput = style({
  "@media": {
    [breakpoints.tablet]: {
      flexGrow: 1,
      flexBasis: "66%",
    },
  },
});

export const minutesUrlApproveButton = style({
  "@media": {
    [breakpoints.tablet]: {
      flexShrink: 1,
      flexBasis: "33%",
    },
  },
});

export const minutesUrlContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",
  alignItems: "center",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const icon = style({
  height: vars.sizes.small,
});
