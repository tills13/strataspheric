import { vars } from "../../app/theme.css";
import * as inputStyles from "../Input/styles.css";
import { style } from "@vanilla-extract/css";

export const wrapper = style([
  inputStyles.inputFieldWrapper,
  {
    height: "unset",
    padding: `${vars.spacing.normal} 0 0 ${vars.spacing.normal}`,
  },
]);

export const textareaTextarea = style([
  inputStyles.inputFieldInput,
  {
    display: "block",
    color: vars.fontColors.primary,
    background: "none",
    boxShadow: "none",
    outline: "none",

    selectors: {
      "&::placeholder": {
        color: vars.fontColors.secondary,
      },
      "&:hover": {
        borderColor: vars.colors.borderDefaultHover,
      },
      "&:disabled": {
        opacity: 0.7,
        cursor: "not-allowed",
      },
    },
  },
]);

export const textareaPlaceholder = style([inputStyles.inputFieldLabel]);
