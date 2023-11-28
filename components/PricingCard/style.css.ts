import { vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
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
  color: vars.colors.grey700,
  textTransform: "uppercase",
  padding: padding(vars.spacing.small, vars.spacing.normal),
});

export const numSeatsField = style({
  display: "flex",
  gap: vars.spacing.small,
  width: "100%",
});

export const numSeatsInput = style({
  flex: 1,
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
  { fill: important(vars.colors.green) },
]);

export const estimateContainer = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.fontSizes.xl,
  fontWeight: 400,
});
export const estimateSummarySeats = style({ fontWeight: 700 });

export const estimatePeriod = style({
  display: "block",
  fontSize: vars.fontSizes.small,
  textAlign: "end",
});

export const selectPlanButtonLink = style({
  textDecoration: "none",
});

export const selectPlanButton = style([
  buttonStyles.buttonFullWidth,
  buttonStyles.buttonSizes.normal,
  buttonStyles.buttonVariants.primary,
]);
