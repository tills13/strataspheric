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
      overflow: "hidden",
    },
  },
});

export const pageContainer = style({
  padding: vars.spacing.normal,
  overflow: "auto",
});
