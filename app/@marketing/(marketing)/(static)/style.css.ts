import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const staticPageContainer = style({
  marginTop: 100,
  marginBottom: 100,
  textAlign: "justify",
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      width: 600,
      margin: "100px auto",
    },
  },
});
