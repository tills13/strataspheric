import * as buttonStyles from "../../../../../../components/Button/style.css";
import * as iconButtonStyles from "../../../../../../components/IconButton/style.css";
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
  padding: vars.spacing.normal,
});

export const meetingTimelineSearchContainer = style({
  overflow: "auto",
  padding: vars.spacing.normal,
});

export const header = style({
  position: "relative",
  marginBottom: vars.spacing.large,
});

export const headerHeader = style({
  marginBottom: vars.spacing.small,
});

export const editMeetingButton = style([
  iconButtonStyles.iconButton,
  iconButtonStyles.iconButtonSizes.small,
  buttonStyles.buttonVariants.transparent,
  {
    float: "right",
    clear: "both",
  },
]);

export const meetingAgendaList = style({
  listStyle: "none",
});
