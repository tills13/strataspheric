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
  marginBottom: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      marginBottom: vars.spacing.xl,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const getStartedForm = style({
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      maxWidth: calc("100%").subtract(calc("300px").multiply(2)).toString(),
    },
  },
});
