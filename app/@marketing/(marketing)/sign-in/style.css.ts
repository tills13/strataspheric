import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const signInForm = style({
  width: "100%",
  maxWidth: "420px",
  backgroundColor: vars.surfaces.raised,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius.xl,
  boxShadow: vars.shadows.md,
  padding: vars.spacing.large,

  "@media": {
    [breakpoints.tablet]: {
      padding: vars.spacing["40"],
    },
  },
});
