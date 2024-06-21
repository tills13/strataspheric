import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../theme";

export const dashboardLayoutContainer = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",

  "@media": {
    [breakpoints.tablet]: {
      overflow: "hidden",
    },
  },
});

export const pageContainer = style({
  padding: vars.spacing.normal,
  overflow: "auto",
});

export const pageContainerFullWidthMobile = style([
  pageContainer,
  {
    padding: padding(vars.spacing.normal, "0"),
    "@media": {
      [breakpoints.tablet]: {
        padding: vars.spacing.normal,
      },
    },
  },
]);

export const dashboardWidgetGridContainer = style({
  display: "grid",
  gridTemplateColumns: "100%",
  gap: vars.spacing.normal,
  overflow: "auto",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridAutoRows: "400px",
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});
