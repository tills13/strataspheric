import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, important, padding } from "../../theme";

export const pricingCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const pricingCardPlanName = style({
  display: "inline-block",
  borderRadius: vars.borderRadius,
  textAlign: "center",
  fontFamily: vars.fontFamilies.primary,
  backgroundColor: vars.colors.grey100,
  color: vars.fontColors.primary,
  textTransform: "uppercase",
  padding: padding(vars.spacing.small, vars.spacing.normal),
});

export const pricingContainer = style({
  padding: padding(vars.spacing.normal, "0"),
  borderTop: border("1px", "solid", vars.colors.borderDefault),
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
  textAlign: "center",
  fontWeight: 400,
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
  marginBottom: vars.spacing.normal,
});

export const planFeaturesList = style({
  marginLeft: vars.spacing.large,
  listStyle: "none",
});

export const planFeaturesFeature = style({
  display: "flex",
  gap: 0,
  padding: vars.spacing.small,
  opacity: 0.3,
});

export const planFeaturesIncludedFeature = style([
  planFeaturesFeature,
  { opacity: 1 },
]);

export const planFeaturesFeatureIcon = style({
  verticalAlign: "top",
  marginLeft: `calc(-1 * ${vars.spacing.large})`,
  marginRight: "12px",
  height: "24px",
});
export const planFeaturesFeatureIconIncluded = style([
  planFeaturesFeatureIcon,
  { fill: important(vars.colors.green500) },
]);

export const selectPlanButtonLink = style({
  textDecoration: "none",
});
