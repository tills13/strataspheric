import { breakpoints } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const body = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  minHeight: "100vh",

  "@media": {
    [breakpoints.tablet]: {
      // move to container that includes both the content and the footer
      // height: "100vh",
    },
  },
});
