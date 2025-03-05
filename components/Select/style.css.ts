import { vars } from "../../app/theme.css";
import { inputFieldLabel, inputFieldWrapper } from "../Input/styles.css";
import { style } from "@vanilla-extract/css";

export const selectWrapper = style([inputFieldWrapper]);

export const select = style({
  appearance: "none",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  border: "none",
  padding: 0,
  margin: 0,
  outline: "none",

  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.0rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5rem 1.5rem",
});

export const selectPlaceholder = style({
  color: vars.fontColors.secondary,
});

export const selectFieldLabel = style([inputFieldLabel]);
