import { breakpoints, vars } from "../../theme.css";
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
  display: "flex",
  flexDirection: "column",
  height: "100svh",
  overflowY: "auto",
  backgroundColor: vars.surfaces.page,

  "@media": {
    [breakpoints.tabletPlus]: {
      height: "100%",
      maxHeight: "100vh",
    },
  },
});
