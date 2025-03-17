import { vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../../theme";

export const pageContainer = style({
  padding: vars.spacing.normal,
});

export const meetingsList = style({});

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
