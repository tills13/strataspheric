import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const radioButton = style({
  height: vars.sizes.normal,
  padding: vars.spacing.xxs,
  borderRadius: vars.borderRadius.md,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
});

export const radioButtonButton = style({
  position: "relative",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  color: vars.fontColors.primary,
  backgroundColor: vars.surfaces.interactive,
  borderRadius: vars.borderRadius.md,

  selectors: {
    "&:hover": {
      backgroundColor: vars.surfaces.interactiveHover,
    },
    "&:not(:disabled):hover": {
      cursor: "pointer",
    },
    '&:has(input[type="radio"]:checked)': {
      backgroundColor: vars.colors.primary,
      color: vars.fontColors.primaryInverse,
    },
  },
});

export const radioButtonHiddenRadioInput = style({
  position: "absolute",
  top: "-1000px",
});
