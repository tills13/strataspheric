import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const layoutContainer = style({
  display: "grid",
  gap: vars.spacing.large,

  "@media": {
    [breakpoints.tabletPlus]: {
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

export const getStartedForm = style({
  maxWidth: calc("100%").subtract(calc("300px").multiply(2)).toString(),
});
