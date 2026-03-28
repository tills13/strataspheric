import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const assumeBar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing.normal,
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  backgroundColor: vars.colors.orange500,
  color: vars.colors.white,
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.small,
  zIndex: 1012,
});

export const stopButton = style({
  padding: `${vars.spacing.xs} ${vars.spacing.small}`,
  borderRadius: vars.borderRadius.md,
  border: `1px solid ${vars.colors.white}`,
  backgroundColor: "transparent",
  color: vars.colors.white,
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.small,
  cursor: "pointer",
  transition: `background-color ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
});
