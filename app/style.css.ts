import { breakpoints, sidebarWidthVar } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const body = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",
  minHeight: "100vh",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      vars: {
        [sidebarWidthVar]: "250px",
      },
    },
  },

  vars: {
    [sidebarWidthVar]: "0px",
  },
});
