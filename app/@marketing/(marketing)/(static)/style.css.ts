import { breakpoints } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

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
