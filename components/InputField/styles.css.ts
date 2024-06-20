import { vars } from "../../app/theme.css";
import * as inputStyles from "../Input/style.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

export const inputFieldWrapper = style([
  inputStyles.input,
  {
    position: "relative",
    display: "flex",
  },
]);

export const inputFieldInput = style({
  position: "relative",
  border: "none",
  background: "none",
  outline: "none",
  top: 0,
  width: "100%",
  transition: "top 0.1s ease",
  // color: vars.fontColors.secondary,

  selectors: {
    "&[type=file]": {
      cursor: "pointer",
    },
    "&[type=file]::file-selector-button": {
      display: "none",
    },
    "&::placeholder": {
      color: vars.fontColors.secondary,
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
  top: 7,
  left: vars.spacing.normal,
  color: vars.fontColors.secondary,
  transition: "top 0.1s ease, left 0.1s ease 0.1s, padding 0.1s ease 0.1s",

  selectors: {
    [`${inputFieldInput}:not(:placeholder-shown) ~ &`]: {
      padding: padding(0, vars.spacing.small),
      left: calc(vars.spacing.normal).subtract(vars.spacing.small).toString(),
      backgroundColor: vars.colors.white,
      lineHeight: 1,
      top: "-9px",
    },
  },
});
