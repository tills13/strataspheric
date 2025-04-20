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

export const meetingFilesList = style({
  overflow: "hidden",
});

export const meetingFilesListItem = style({
  overflow: "hidden",
});

export const meetingFilesListItemAttachmentChip = style({
  flex: 1,
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

export const icon = style({
  height: vars.sizes.small,
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

export const strataActivityModalTimelineContainer = style({
  overflowY: "auto",
});
