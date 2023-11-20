import { vars } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const base = style({
  position: "relative",
  display: "inline-block",
  fontWeight: 700,
  border: `2px solid ${vars.colors.borderDefault}`,
  outline: "none",
  cursor: "pointer",
  borderRadius: vars.borderRadius,
  textTransform: "uppercase",
});

export const sizeVariants = styleVariants({
  small: {
    height: vars.sizes.small,
    padding: `0 ${vars.spacing.normal}`,
  },
  normal: {
    height: vars.sizes.normal,
    padding: `0 ${vars.spacing.normal}`,
  },
  large: {
    height: vars.sizes.large,
    padding: `0 ${vars.spacing.normal}`,
  },
  xl: {
    height: vars.sizes.xl,
    padding: `0 ${vars.spacing.normal}`,
  },
  xxl: {
    height: vars.sizes.xxl,
    padding: `0 ${vars.spacing.normal}`,
  },
});

export const variants = styleVariants({
  base: {
    borderColor: vars.colors.borderDefault,
    color: vars.fontColors.primary,

    selectors: {
      "&:disabled": {
        opacity: 0.9,
      },
      "&:hover": {
        color: vars.fontColors.primary,
        borderColor: vars.colors.borderDefaultHover,
      },
    },
  },

  primary: {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
    borderColor: vars.colors.grey800,

    selectors: {
      "&:disabled": {
        opacity: 0.4,
        // backgroundColor: vars.colors.grey500,
        // borderColor: vars.colors.grey500,
      },

      "&:hover": {
        color: vars.colors.grey200,
        borderColor: vars.colors.grey900,
      },
    },
  },
});
