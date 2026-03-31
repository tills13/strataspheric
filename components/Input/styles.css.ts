import { iconColorVar, vars } from "../../app/theme.css";
import {
  field,
  fieldLeftActionContainer,
  fieldRightActionContainer,
} from "../Form/style.css";
import { stackElement } from "../Stack/style.css";
import { style } from "@vanilla-extract/css";

export const inputFieldIconContainer = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  paddingLeft: vars.spacing.small,
  marginRight: vars.spacing.small,
  vars: {
    [iconColorVar]: vars.fontColors.secondary,
  },
});

export const inputFieldWrapper = style([
  field,
  {
    selectors: {
      [`&${stackElement}`]: {
        width: "100%",
      },
      [`&:has(${inputFieldIconContainer})`]: {
        paddingLeft: 0,
      },
    },
  },
]);

export const inputFieldInput = style({
  position: "relative",
  border: "none",
  background: "none",
  outline: "none",
  width: "100%",

  selectors: {
    "&[type=file]": {
      color: vars.fontColors.placeholder,
      cursor: "pointer",
    },
    '&[type=file][data-has-file="true"]': {
      color: "inherit",
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
    "&:focus": {
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

export const inputFieldLeftActionContainer = style([fieldLeftActionContainer]);
export const inputFieldRightActionContainer = style([
  fieldRightActionContainer,
]);
