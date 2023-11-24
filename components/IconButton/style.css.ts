import { vars } from "../../app/theme.css";
import * as buttonProps from "../Button/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const iconButton = style([
  buttonProps.base,
  {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);

export const sizeVariants = styleVariants({
  small: {
    height: vars.sizes.small,
    width: vars.sizes.small,
  },
  normal: {
    height: vars.sizes.normal,
    width: vars.sizes.normal,
  },
  large: {
    height: vars.sizes.large,
    width: vars.sizes.large,
  },
  xl: {
    height: vars.sizes.xl,
    width: vars.sizes.xl,
  },
  xxl: {
    height: vars.sizes.xxl,
    width: vars.sizes.xxl,
  },
});
