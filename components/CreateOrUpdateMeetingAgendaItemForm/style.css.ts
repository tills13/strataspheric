import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const fileAttachmentContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {
      gap: vars.spacing.normal,
      flexDirection: "row",
    },
  },
});

export const fileAttachmentButton = style({
  "@media": {
    [breakpoints.tablet]: {
      flex: 1,
    },
  },
});
