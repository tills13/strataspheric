import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

export const inputFieldWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: `0 ${vars.spacing.normal}`,
  height: "44px",
  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",
});

export const inputFieldInput = style({
  position: "relative",
  border: "none",
  background: "none",
  outline: "none",
  width: "100%",

  selectors: {
    "&[type=file]": {
      paddingTop: "6px",
      cursor: "pointer",
    },
    "&[type=file]::file-selector-button": {
      display: "none",
    },
    "&::placeholder": {
      color: vars.fontColors.placeholder,
    },
    "&::file-selector-button": {
      background: "none",
      border: 0,
      fontFamily: vars.fontFamilies.text,
      fontWeight: vars.fontWeights.bold,
    },
    "&:hover": {
      backgroundColor: vars.colors.white,
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:focus": {
      backgroundColor: vars.colors.white,
      opacity: 1,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});

export const inputFieldFileIcon = style({
  height: vars.sizes.xs,
  marginRight: vars.spacing.small,
});

export const inputFieldPlaceholder = style({
  position: "absolute",
  pointerEvents: "none",
  top: "-9px",
  left: calc(vars.spacing.normal).subtract(vars.spacing.small).toString(),
  padding: padding(0, vars.spacing.small),
  color: vars.fontColors.secondary,
  backgroundColor: vars.colors.white,
  zIndex: 100,
});
