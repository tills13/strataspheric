import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

export const inboxMessages = style({});

export const inboxMessagesNoMessages = style({
  marginTop: 100,
  padding: vars.spacing.normal,
  textAlign: "center",
});

export const inboxMessage = style({
  display: "block",
  padding: padding(vars.spacing.small, vars.spacing.normal),
  textDecoration: "none",
  color: vars.fontColors.primary,
  position: "relative",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});
