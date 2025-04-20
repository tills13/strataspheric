import { vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../../theme";

export const meetingListContainer = style({});

export const meetingListRow = style({
  display: "block",
  padding: vars.spacing.normal,
  textDecoration: "none",
  color: vars.fontColors.primary,

  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});
