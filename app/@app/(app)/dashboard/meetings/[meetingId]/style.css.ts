import * as buttonStyles from "../../../../../../components/Button/style.css";
import * as iconButtonStyles from "../../../../../../components/IconButton/style.css";
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
  position: "sticky",
  top: 0,
  padding: vars.spacing.normal,
});

export const meetingTimelineSearchContainer = style({
  overflow: "auto",
  padding: vars.spacing.normal,
  // height: `calc(100vh - 81px - 49px)`,
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
  buttonStyles.buttonVariants.tertiary,
  {
    float: "right",
    clear: "both",
  },
]);

export const meetingAgendaList = style({
  listStyle: "none",
});
