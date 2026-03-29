import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../theme";

export const pricingPlanSelectorContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridAutoRows: "min-content",
  gap: vars.spacing.normal,

  "@media": {
    [breakpoints.desktop]: {
      width: 400,
    },
  },
});

export const pricingPlanSelectorLink = style({
  color: "inherit",
  textDecoration: "none",
});

export const pricingPlanSelectorPlan = style({
  height: "100%",
  borderColor: important(vars.colors.borderDefault),
  background: important("none"),
  transition: `border-color ${vars.transitions.fast}, background ${vars.transitions.normal}, box-shadow ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      borderColor: important(vars.colors.borderDefaultHover),
    },
  },
});

export const activePlan = style([
  pricingPlanSelectorPlan,
  {
    borderColor: important(vars.colors.primary),
    background: important(
      `linear-gradient(to right, color-mix(in srgb, ${vars.colors.primary} 18%, transparent), color-mix(in srgb, ${vars.colors.primary} 4%, transparent) 75%)`,
    ),
    boxShadow: vars.shadows.md,

    selectors: {
      "&:hover": {
        borderColor: important(vars.colors.primaryHover),
      },
    },
  },
]);
