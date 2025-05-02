import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const pricingPlanSelectorContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridAutoRows: 150,
  gap: vars.spacing.large,
});

export const pricingPlanSelectorLink = style({
  color: "inherit",
  textDecoration: "none",
});

export const pricingPlanSelectorPlan = style({
  // height: 150,
  height: "100%",

  selectors: {
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
  },
});

export const activePlan = style([
  pricingPlanSelectorPlan,
  {
    borderColor: vars.colors.primary,
    selectors: {
      "&:hover": {
        borderColor: vars.colors.primary,
      },
    },
  },
]);
