import { vars } from "../../app/theme.css";
import {
  assignVars,
  createThemeContract,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

const buttonThemeContract = createThemeContract({
  color: null,
  colorHover: null,
  textColor: null,
  textColorHover: null,
  borderColor: null,
  borderColorHover: null,
});

export const button = style({
  vars: assignVars(buttonThemeContract, {
    color: vars.colors.grey100,
    colorHover: vars.colors.grey200,
    textColor: vars.fontColors.primary,
    textColorHover: vars.fontColors.primaryHover,
    borderColor: vars.colors.borderDefault,
    borderColorHover: vars.colors.borderDefaultHover,
  }),

  position: "relative",
  fontWeight: 700,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: buttonThemeContract.borderColor,
  outline: "none",
  cursor: "pointer",
  borderRadius: vars.borderRadius,
  textTransform: "uppercase",

  backgroundColor: buttonThemeContract.color,
  color: buttonThemeContract.textColor,

  selectors: {
    "&:disabled": {
      opacity: 0.5,
    },

    "&:hover": {
      backgroundColor: buttonThemeContract.colorHover,
      borderColor: buttonThemeContract.borderColorHover,
      color: buttonThemeContract.textColorHover,
    },
  },
});

export const fullWidth = style([
  button,
  {
    width: "100%",
  },
]);

export const buttonSizes = styleVariants({
  small: {
    padding: `${vars.spacing.xs} ${vars.spacing.small}`,
  },
  normal: {
    padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  },
  large: {
    padding: `${vars.spacing.normal} ${vars.spacing.large}`,
  },
  xl: {
    padding: `${vars.spacing.large} ${vars.spacing.xl}`,
  },
  xxl: {
    padding: `${vars.spacing.xl} ${vars.spacing.xxl}`,
  },
});

export const colors = styleVariants({
  primary: {
    vars: assignVars(buttonThemeContract, {
      color: vars.colors.primary,
      colorHover: vars.colors.primaryHover,
      textColor: vars.colors.white,
      textColorHover: vars.colors.white,
      borderColor: vars.colors.primary,
      borderColorHover: vars.colors.primaryHover,
    }),
  },
  error: {
    vars: assignVars(buttonThemeContract, {
      color: vars.colors.red500,
      colorHover: vars.colors.red700,
      textColor: vars.fontColors.primary,
      textColorHover: vars.fontColors.primary,
      borderColor: vars.colors.red500,
      borderColorHover: vars.colors.red700,
    }),
  },
});

export const buttonVariants = styleVariants({
  primary: {},

  secondary: {
    backgroundColor: "transparent",
    borderColor: fallbackVar(
      buttonThemeContract.color,
      vars.colors.borderDefault,
    ),
    color: fallbackVar(buttonThemeContract.color, vars.colors.grey600),

    selectors: {
      "&:hover": {
        backgroundColor: "transparent",
        borderColor: fallbackVar(
          buttonThemeContract.colorHover,
          vars.colors.borderDefaultHover,
        ),
        color: fallbackVar(buttonThemeContract.colorHover, vars.colors.grey700),
      },
    },
  },

  tertiary: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: vars.fontColors.primary,

    selectors: {
      "&:hover": {
        color: vars.colors.grey700,
        backgroundColor: vars.colors.grey100,
        borderColor: "transparent",
      },
    },
  },
});
