import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const base = style({
  position: "relative",
  display: "inline-block",
  height: vars.sizes.normal,
  padding: `0 ${vars.spacing.normal}`,
  color: vars.fontColors.primary,
  fontWeight: 700,
  backgroundColor: vars.colors.globalBg,
  border: `2px solid ${vars.colors.borderDefault}`,
  outline: "none",
  cursor: "pointer",
  borderRadius: vars.borderRadius,
  textTransform: "uppercase",

  selectors: {
    "&:hover": {
      color: vars.fontColors.primary,
      borderColor: vars.colors.borderDefaultHover,
    },
  },
});

export const compact = style([
  base,
  {
    height: vars.sizes.small,
    padding: `0 ${vars.spacing.small}`,
  },
]);
