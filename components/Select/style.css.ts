import { vars } from "../../app/theme.css";
import { field, fieldLabel } from "../Form/style.css";
import { inputFieldInput, inputFieldWrapper } from "../Input/styles.css";
import { style } from "@vanilla-extract/css";

export const selectWrapper = style([field, inputFieldWrapper]);
export const selectPlaceholder = style({});

export const select = style([
  inputFieldInput,
  {
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

    selectors: {
      [`&:not(:has(option:not(${selectPlaceholder}):checked))`]: {
        color: vars.fontColors.placeholder,
      },
    },
  },
]);

export const selectFieldLabel = style([fieldLabel]);
