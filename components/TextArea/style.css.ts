import { vars } from "../../app/theme.css";
import { field, fieldLabel } from "../Form/style.css";
import { inputFieldInput } from "../Input/styles.css";
import { style } from "@vanilla-extract/css";

export const wrapper = style([
  field,
  {
    height: "unset",
    padding: 0,
  },
]);

export const textareaTextarea = style([
  inputFieldInput,
  {
    display: "block",
    color: vars.fontColors.primary,
    background: "none",
    boxShadow: "none",
    outline: "none",
    padding: `12px ${vars.spacing.normal}`,
  },
]);

export const textareaPlaceholder = style([fieldLabel]);
