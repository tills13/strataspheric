import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const invoicesTable = style({
  margin: 0,
  "@media": {
    [breakpoints.tablet]: {
      marginLeft: vars.spacing.normal,
      marginRight: vars.spacing.normal,
    },
  },
});
