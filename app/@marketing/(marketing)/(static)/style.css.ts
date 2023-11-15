import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../../theme.css";

export const staticPageContainer = style({
  marginTop: 100,
  textAlign: "justify",

  "@media": {
    [breakpoints.tablet]: {
      width: 600,
      margin: "100px auto",
    },
  },
});
