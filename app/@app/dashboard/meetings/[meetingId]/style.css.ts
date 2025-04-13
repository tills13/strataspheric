import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../../../theme";

export const meetingAgendaContainer = style({
  padding: vars.spacing.normal,
});

export const meetingAgendaContainerDeleteMeeting = style({
  "@media": {
    [breakpoints.desktop]: {
      display: "none",
    },
  },
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

// @todo Flex
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
