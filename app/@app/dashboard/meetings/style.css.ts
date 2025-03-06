import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../../../theme";

export const meetingsList = style({});

export const noMeetingsMessage = style({
  margin: vars.spacing.normal,
});

export const meetingListContainer = style({});

export const meetingListRow = style({
  display: "block",
  padding: vars.spacing.normal,
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
  textDecoration: "none",
  color: vars.fontColors.primary,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const meetingDate = style({
  color: vars.fontColors.secondary,
});
