import { vars } from "../../app/theme.css";
import * as inputStyles from "../Input/style.css";
import { style } from "@vanilla-extract/css";

export const inputFieldWrapper = style([
  inputStyles.input,
  {
    position: "relative",
    padding: `12px ${vars.spacing.normal}`,
  },
]);

export const inputFieldInput = style({
  position: "relative",
  border: "none",
  background: "none",
  outline: "none",
  top: 0,
  transition: "top 0.1s ease",

  selectors: {
    "&:not(:placeholder-shown)": {
      top: "8px",
    },
  },
});

export const inputFieldPlaceholder = style({
  position: "absolute",
  pointerEvents: "none",
  color: vars.fontColors.secondary,
  left: vars.spacing.normal,
  transition: "top 0.1s ease, font-size 0.1s ease",

  selectors: {
    [`${inputFieldInput}:not(:placeholder-shown) ~ &`]: {
      fontSize: "0.7em",
      top: "6px",
    },
  },
});
