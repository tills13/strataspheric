import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

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
  fontSize: "40px",
  backgroundColor: vars.colors.grey700,
  color: vars.colors.white,
  textTransform: "uppercase",
  padding: padding(vars.spacing.small, vars.spacing.normal),
  marginTop: "-36px",
});

export const planDetailsList = style({
  marginLeft: vars.spacing.large,
});

export const numSeatsField = style({
  display: "flex",
  gap: vars.spacing.small,
  width: "100%",
});

export const numSeatsInput = style({
  flex: 1,
});

export const feeStructureContainer = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 400,
});

export const estimateContainer = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.fontSizes.xl,
  fontWeight: 400,
});
export const estimateSummary = style({});
export const estimateSummarySeats = style({ fontWeight: 700 });

export const estimatePeriod = style({
  display: "block",
  fontSize: vars.fontSizes.small,
  textAlign: "end",
});

export const selectPlanButton = style({
  width: "100%",
});
