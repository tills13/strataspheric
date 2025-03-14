import { vars } from "../../app/theme.css";
import { panel } from "../Panel/style.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

export const field = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: `0 ${vars.spacing.normal}`,
  marginTop: "6px",
  height: "44px",
  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",

  selectors: {
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    "&::placeholder": {
      color: vars.fontColors.secondary,
    },

    [`${panel} &`]: {
      backgroundColor: vars.colors.grey0,
    },
  },
});

export const fieldLabel = style({
  position: "absolute",
  pointerEvents: "none",
  top: "-11px",
  left: calc(vars.spacing.normal).subtract(vars.spacing.small).toString(),
  padding: padding(0, vars.spacing.small),
  fontWeight: vars.fontWeights.bold,
  color: vars.fontColors.secondary,
  backgroundColor: vars.colors.white,
  zIndex: 100,

  selectors: {
    [`${panel} &`]: {
      backgroundColor: vars.colors.grey0,
    },
  },
});
