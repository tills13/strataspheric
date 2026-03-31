import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { colorMix } from "../../../../../styles/utils";

export const meetingAgendaContainer = style({});

export const meetingAgendaContainerDeleteMeeting = style({
  "@media": {
    [breakpoints.desktop]: {
      display: "none",
    },
  },
});

export const meetingAgendaProgress = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  paddingBlock: vars.spacing.normal,
  paddingInline: vars.spacing["20"],
  marginInline: `calc(-1 * ${vars.spacing["20"]})`,
  transition: `background-color ${vars.transitions.slow}, backdrop-filter ${vars.transitions.slow}, box-shadow ${vars.transitions.slow}, border-color ${vars.transitions.slow}`,
  borderBottom: "1px solid transparent",
});

export const meetingAgendaProgressStuck = style({
  backgroundColor: colorMix(vars.colors.white, 55),
  backdropFilter: "blur(24px) saturate(1.6)",
  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
  borderBottom: `1px solid ${colorMix(vars.colors.indigo200, 30)}`,
  boxShadow: [
    `0 4px 24px ${colorMix(vars.colors.indigo300, 10)}`,
    `0 1px 8px ${colorMix(vars.colors.indigo400, 6)}`,
    `inset 0 1px 0 ${colorMix(vars.colors.white, 50)}`,
  ].join(", "),
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
