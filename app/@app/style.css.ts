import { breakpoints, vars } from "../theme.css";
import { style } from "@vanilla-extract/css";

export const signInToStrataPageContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  padding: `${vars.spacing["48"]} ${vars.spacing.normal}`,
  "@media": {
    [breakpoints.tablet]: {
      alignItems: "center",
      padding: `${vars.spacing.xl} ${vars.spacing.normal}`,
    },
  },
});

export const signInToStrataPageFormContainer = style({
  width: "100%",
  padding: vars.spacing.large,
  backgroundColor: vars.surfaces.raised,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius.xl,
  boxShadow: vars.shadows.md,

  "@media": {
    [breakpoints.tablet]: {
      position: "relative",
      maxWidth: "460px",
      padding: vars.spacing["40"],
    },
  },
});

export const signInForm = style({ width: "100%" });
