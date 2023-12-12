import { vars } from "../../app/theme.css";
import * as buttonProps from "../Button/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const iconButton = style([
  buttonProps.button,
  {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);

export const iconButtonSizes = styleVariants({
  small: {
    padding: `${vars.spacing.xs} ${vars.spacing.xs}`,
  },
  normal: {
    padding: `${vars.spacing.small} ${vars.spacing.small}`,
  },
  large: {
    padding: `${vars.spacing.normal} ${vars.spacing.normal}`,
  },
  xl: {
    padding: `${vars.spacing.large} ${vars.spacing.large}`,
  },
  xxl: {
    padding: `${vars.spacing.xl} ${vars.spacing.xl}`,
  },
});
