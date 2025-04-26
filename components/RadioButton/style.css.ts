import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const radioButton = style({
  height: vars.sizes.normal,
  padding: vars.spacing.xxs,
  borderRadius: vars.borderRadius,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
});

export const radioButtonButton = style({
  position: "relative",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: vars.colors.grey0,
  borderRadius: vars.borderRadius,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
    "&:not(:disabled):hover": {
      cursor: "pointer",
    },
    '&:has(input[type="radio"]:checked)': {
      backgroundColor: vars.colors.grey200,
    },
  },
});

export const radioButtonHiddenRadioInput = style({
  position: "absolute",
  top: "-1000px",
});
