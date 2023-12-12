import { vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import { style } from "@vanilla-extract/css";

export const input = style({
  display: "block",
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",

  selectors: {
    "&[type=file]": {
      paddingTop: 6,
      cursor: "pointer",
    },
    "&::file-selector-button": {
      background: "none",
      border: 0,
      fontFamily: vars.fontFamilies.text,
      fontWeight: vars.fontWeights.bold,
    },
    "&::placeholder": {
      color: vars.fontColors.secondary,
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

export const textarea = style([
  input,
  {
    padding: `${vars.spacing.small} ${vars.spacing.normal}`,
    height: "auto",
  },
]);

export const compact = style([
  input,
  {
    height: vars.sizes.small,
    padding: `0 ${vars.spacing.small}`,
  },
]);
