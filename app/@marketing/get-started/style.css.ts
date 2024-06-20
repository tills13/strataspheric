import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
  display: "grid",
  gap: vars.spacing.large,

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "300px auto",
    },
  },
});

export const pricingPlanSelector = style({
  marginBottom: vars.spacing.xl,
  "@media": {
    [breakpoints.tablet]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    [breakpoints.desktop]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const getStartedForm = style({});
