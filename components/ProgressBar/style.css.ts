import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { colorMix } from "../../styles/utils";

export const progressBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const progressTrack = style({
  flex: 1,
  height: 4,
  backgroundColor: colorMix(vars.colors.grey300, 30),
  borderRadius: vars.borderRadius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: vars.colors.green500,
  borderRadius: vars.borderRadius.full,
  transition: `width 400ms ease`,
});

export const progressLabel = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: vars.fontColors.secondary,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});
