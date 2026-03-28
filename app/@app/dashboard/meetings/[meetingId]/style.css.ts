import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const meetingAgendaContainer = style({});

export const meetingAgendaContainerDeleteMeeting = style({
  "@media": {
    [breakpoints.desktop]: {
      display: "none",
    },
  },
});

export const meetingAgendaEmptyInfoPanel = style({
  height: 200,
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

export const minutesUrl = style({
  display: "flex",
  alignItems: "center",
});

export const minutesUrlActionsContainer = style({
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      width: "auto",
      flexShrink: 1,
      flexBasis: "25%",
    },
  },
});

export const minutesUrlApproveButton = style({
  "@media": {
    [breakpoints.tablet]: {
      flex: 1,
    },
  },
});

export const strataActivityModalTimelineContainer = style({
  overflowY: "auto",
});
