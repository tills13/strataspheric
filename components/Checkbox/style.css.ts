import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const checkbox = style({
  display: "inline-block",
  position: "relative",

  height: vars.sizes.xs,
  width: vars.sizes.xs,

  flexShrink: 0,

  padding: 0,
  backgroundColor: vars.surfaces.raised,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius.sm,
  boxShadow: "none",
  outline: "none",
  overflow: "hidden",
  cursor: "pointer",
  transition: `border-color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}, background-color ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },

    "&:focus-within:has(input:focus-visible)": {
      borderColor: vars.colors.blue600,
      boxShadow: vars.focusRing,
    },

    "&:has(input[type=checkbox]:checked)": {
      backgroundColor: vars.colors.primary,
      borderColor: vars.colors.primary,
      boxShadow: `inset 0px 0px 0px 2px ${vars.colors.white}`,
    },

    "&:has(input[type=checkbox]:checked):hover": {
      backgroundColor: vars.colors.primaryHover,
      borderColor: vars.colors.primaryHover,
    },

    "&:has(input[type=checkbox]:checked):focus-within:has(input:focus-visible)": {
      boxShadow: `inset 0px 0px 0px 2px ${vars.colors.white}, ${vars.focusRing}`,
    },

    "&:has(input[type=checkbox]:disabled)": {
      opacity: vars.opacity.muted,
      cursor: "not-allowed",
    },
  },
});

export const checkboxElement = style({
  position: "absolute",
  top: -100,
  width: 1,
  height: 1,
});
