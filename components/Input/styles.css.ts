import { vars } from "../../app/theme.css";
import {
  field,
  fieldLabel,
  fieldLeftActionContainer,
  fieldRightActionContainer,
} from "../Form/style.css";
import { groupElement } from "../Group/style.css";
import { stackElement } from "../Stack/style.css";
import { style } from "@vanilla-extract/css";

export const inputFieldWrapper = style([
  field,
  {
    [`&${groupElement}`]: {
      marginTop: 0,
      width: "100%",
    },
    [`&${stackElement}`]: {
      width: "100%",
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

export const inputFieldLeftActionContainer = style([fieldLeftActionContainer]);
export const inputFieldRightActionContainer = style([
  fieldRightActionContainer,
]);

export const inputFieldLabel = style([fieldLabel]);
