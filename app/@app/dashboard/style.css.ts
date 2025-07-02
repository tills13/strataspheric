import { breakpoints } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const dashboardLayoutContainer = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",

  "@media": {
    [breakpoints.tabletPlus]: {
      gridTemplateColumns: "min-content auto",
      gridTemplateRows: "unset",
      height: "100vh",
      overflow: "hidden",
    },
  },
});

export const dashboardContentsContainer = style({
  "@media": {
    [breakpoints.tabletPlus]: {
      display: "grid",
      gridTemplateRows: "min-content min-content auto",
      maxHeight: "100vh",
      overflowY: "auto",
    },
  },
});
