import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const layoutContainer = style({});

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
