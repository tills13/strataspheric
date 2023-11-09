import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const button = style({
  position: "relative",
  display: "inline-block",
  height: vars.sizes.normal,
  padding: `0 ${vars.spacing.normal}`,
  color: vars.fontColors.primary,
  backgroundColor: vars.colors.globalBg,
  border: `2px solid ${vars.colors.grey700}`,
  outline: "none",
  cursor: "pointer",
  borderRadius: vars.borderRadius,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey700,
      color: vars.colors.white,
    },
  },
});
