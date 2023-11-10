import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../theme.css";

export const pageContainer = style({
  padding: vars.spacing.normal,
});

export const pageTitle = style({
  marginBottom: vars.spacing.large,
});

export const dashboardWidgetGridContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateRows: "400px",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});
