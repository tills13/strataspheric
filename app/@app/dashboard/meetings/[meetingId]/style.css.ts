import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../../../theme";

export const meetingLayoutContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
      overflow: "hidden",
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "minmax(auto, 400px) minmax(auto, 1000px)",
    },
  },
});

export const meetingInfoSidebar = style({
  display: "none",
  flexDirection: "column",
  justifyContent: "space-between",

  "@media": {
    [breakpoints.desktop]: {
      display: "flex",
      borderRight: `1px solid ${vars.colors.borderDefault}`,
    },
  },
});

export const meetingAgendaContainer = style({
  padding: vars.spacing.normal,
  overflowX: "hidden",
  overflowY: "auto",
});

export const meetingAgendaContainerMeetingInfo = style({
  "@media": {
    [breakpoints.desktop]: {
      display: "none",
    },
  },
});

export const meetingAgendaContainerDeleteMeeting = style({
  "@media": {
    [breakpoints.desktop]: {
      display: "none",
    },
  },
});

export const meetingTimelineSearchContainer = style({
  overflow: "auto",
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      borderLeft: `1px solid ${vars.colors.borderDefault}`,
    },
  },
});

export const header = style({
  position: "relative",
});

export const editMeetingButton = style({
  float: "right",
  clear: "both",
});

export const meetingAgendaList = style({
  listStyle: "none",
});

export const meetingAgendaListItem = style({
  selectors: {
    ["&:not(:last-child)"]: {
      marginBottom: vars.spacing.normal,
    },
  },
});

export const meetingFileContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.normal,
    },
  },
});

export const meetingFile = style({
  display: "flex",
  gap: vars.spacing.small,
  alignItems: "center",
});

export const minutesUrlInput = style({
  "@media": {
    [breakpoints.tablet]: {
      flexGrow: 1,
      flexBasis: "100%",
    },
  },
});

export const minutesUrl = style({
  display: "flex",
  height: vars.sizes.normal,
  padding: vars.spacing.small,
  justifyContent: "space-between",
  backgroundColor: vars.colors.grey50,
  border: border("2px", "solid", vars.colors.grey400),
  borderRadius: vars.borderRadius,
});

export const minutesUrlActionsContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      width: "auto",
      flexShrink: 1,
      flexBasis: "25%",
    },
  },
});

export const minutesUrlApprover = style({
  whiteSpace: "nowrap",
});

export const minutesUrlApproveButton = style({
  "@media": {
    [breakpoints.tablet]: {
      flex: 1,
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

export const strataActivityModalTimelineContainer = style({
  overflowY: "auto",
});
