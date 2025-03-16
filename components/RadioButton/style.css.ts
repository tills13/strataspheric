import { vars } from "../../app/theme.css";
import { buttonBase, buttonSizes } from "../Button/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const radioButton = style({});

export const radioButtonButtonBase = style([
  buttonBase,
  {
    position: "relative",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    outline: "none",
    overflow: "hidden",

    borderTop: `2px solid ${vars.colors.borderDefault}`,
    borderBottom: `2px solid ${vars.colors.borderDefault}`,
    backgroundColor: vars.colors.grey0,

    selectors: {
      [`${radioButton} &:first-child`]: {
        borderLeft: `2px solid ${vars.colors.borderDefault}`,
        borderTopLeftRadius: vars.borderRadius,
        borderBottomLeftRadius: vars.borderRadius,
      },
      [`${radioButton} &:last-child`]: {
        borderRight: `2px solid ${vars.colors.borderDefault}`,
        borderTopRightRadius: vars.borderRadius,
        borderBottomRightRadius: vars.borderRadius,
      },
      [`${radioButton} &:not(:last-child)`]: {
        borderRight: `2px solid ${vars.colors.borderDefault}`,
      },
      "&:hover": {
        backgroundColor: vars.colors.grey100,
      },
      '&:has(input[type="radio"]:checked)': {
        backgroundColor: vars.colors.grey200,
      },
      '&:has(input[type="radio"]:checked):hover': {
        backgroundColor: vars.colors.grey100,
      },
    },
  },
]);

export const radioButtonHiddenRadioInput = style({
  position: "absolute",
  top: "-1000px",
});
