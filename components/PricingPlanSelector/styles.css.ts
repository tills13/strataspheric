import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const pricingPlanSelectorContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridAutoRows: 150,
  gap: vars.spacing.large,

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const pricingPlanSelectorLink = style({
  textDecoration: "none",
});

export const pricingPlanSelectorPlan = style({
  // height: 150,
  height: "100%",
});

export const activePlan = style([
  pricingPlanSelectorPlan,
  {
    borderColor: vars.colors.primary,
  },
]);
