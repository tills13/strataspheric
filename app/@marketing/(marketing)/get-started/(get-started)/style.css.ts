import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
  padding: vars.spacing.normal,
});

export const pricingPlanSelector = style({
  marginBottom: vars.spacing.xl,
  "@media": {
    [breakpoints.tablet]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [breakpoints.desktop]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const getStartedForm = style({
  maxWidth: 500,
  margin: "auto",
});
