import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

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

// Compact card styles

const shimmer = keyframes({
  "0%": { backgroundPosition: "200% 0" },
  "100%": { backgroundPosition: "-200% 0" },
});

export const compactCard = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  overflow: "hidden",
  borderColor: important(vars.colors.primary),
  background: `linear-gradient(to right, color-mix(in srgb, ${vars.colors.primary} 12%, transparent), color-mix(in srgb, ${vars.colors.primary} 0%, transparent) 75%)`,
  transition: `border-color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}, background ${vars.transitions.normal}`,

  selectors: {
    "&:hover": {
      borderColor: vars.colors.primaryHover,
      boxShadow: vars.shadows.md,
      background: `linear-gradient(to right, color-mix(in srgb, ${vars.colors.primary} 18%, transparent), color-mix(in srgb, ${vars.colors.primary} 4%, transparent) 75%)`,
    },
  },
});

export const compactCardRecommended = style([
  compactCard,
  {
    backgroundImage: `linear-gradient(
      100deg,
      color-mix(in srgb, ${vars.colors.primary} 10%, transparent) 0%,
      color-mix(in srgb, ${vars.colors.primary} 6%, transparent) 30%,
      color-mix(in srgb, ${vars.colors.primary} 12%, transparent) 42%,
      color-mix(in srgb, ${vars.colors.primary} 14%, transparent) 50%,
      color-mix(in srgb, ${vars.colors.primary} 12%, transparent) 58%,
      color-mix(in srgb, ${vars.colors.primary} 6%, transparent) 70%,
      color-mix(in srgb, ${vars.colors.primary} 10%, transparent) 100%
    )`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 8s ease-in-out infinite`,
  },
]);

export const compactCardContent = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  gap: vars.spacing.xs,
  padding: padding(vars.spacing.normal, vars.spacing["20"]),
});

export const compactCardHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const compactCardName = style({
  fontSize: vars.fontSizes.medium,
  fontWeight: vars.fontWeights.bold,
  fontFamily: vars.fontFamilies.primary,
  letterSpacing: vars.letterSpacing.tight,
});

export const compactCardBadge = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.bold,
  textTransform: "uppercase",
  letterSpacing: vars.letterSpacing.wider,
  color: vars.colors.white,
  backgroundColor: vars.colors.primary,
  padding: padding(vars.spacing.xxs, vars.spacing.small),
  borderRadius: vars.borderRadius.full,
  lineHeight: vars.lineHeights.normal,
});

export const compactCardPricing = style({
  fontSize: vars.fontSizes.normal,
  color: vars.fontColors.secondary,
});
