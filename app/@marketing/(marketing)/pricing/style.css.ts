import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../../theme.css";

export const layoutContainer = style({
  marginTop: 100,
  padding: vars.spacing.normal,
});

export const plansContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 300px)",
  justifyContent: "center",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(3, 300px)",
    },
  },
});
