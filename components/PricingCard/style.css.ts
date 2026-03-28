import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { border, important, padding } from "../../theme";

export const pricingCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["20"],
});

export const recommendedPricingCard = style([
  pricingCard,
  {
    position: "relative",
    borderColor: vars.colors.primary,
    borderWidth: "2px",
    boxShadow: vars.shadows.lg,

    "@media": {
      [breakpoints.desktop]: {
        paddingTop: vars.spacing.xl,
        paddingBottom: vars.spacing.xl,
      },
    },
  },
]);

export const recommendedBadge = style({
  position: "absolute",
  top: calc(vars.spacing["12"]).negate().toString(),
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.bold,
  textTransform: "uppercase",
  letterSpacing: vars.letterSpacing.wider,
  padding: padding(vars.spacing.xs, vars.spacing.normal),
  borderRadius: vars.borderRadius.full,
  whiteSpace: "nowrap",
});

export const pricingCardPlanName = style({
  display: "inline-block",
  borderRadius: vars.borderRadius.md,
  textAlign: "center",
  fontFamily: vars.fontFamilies.primary,
  backgroundColor: vars.surfaces.sunken,
  color: vars.fontColors.primary,
  textTransform: "uppercase",
  padding: padding(vars.spacing.small, vars.spacing.normal),
});

export const pricingContainer = style({
  padding: padding(vars.spacing["20"], "0"),
  borderTop: border("1px", "solid", vars.colors.borderDefault),
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
  textAlign: "center",
  fontWeight: vars.fontWeights.normal,
});

export const compactPricingContainer = style([
  pricingContainer,
  {
    paddingBottom: 0,
    borderBottom: 0,
  },
]);

export const perSeatPricingSummary = style({
  fontSize: vars.fontSizes.large,
});

export const featuresSection = style({
  flex: 1,
});

export const planFeaturesListHeader = style({
  marginBottom: vars.spacing["12"],
});

export const planFeaturesList = style({
  marginLeft: vars.spacing.large,
  listStyle: "none",
});

export const planFeaturesFeature = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: vars.spacing["10"],
  opacity: vars.opacity.disabled,
});

export const planFeaturesIncludedFeature = style([
  planFeaturesFeature,
  { opacity: 1 },
]);

export const planFeaturesFeatureIcon = style({
  verticalAlign: "top",
  marginLeft: `calc(-1 * ${vars.spacing.large})`,
  marginRight: vars.spacing["12"],
  height: vars.sizes.xs,
});
export const planFeaturesFeatureIconIncluded = style([
  planFeaturesFeatureIcon,
  { fill: important(vars.colors.green500) },
]);

export const selectPlanButtonLink = style({
  textDecoration: "none",
});
