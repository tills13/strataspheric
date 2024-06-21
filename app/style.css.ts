import { breakpoints } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const body = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",
  minHeight: "100vh",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      // move to container that includes both the content and the footer
      // height: "100vh",
    },
  },
});
