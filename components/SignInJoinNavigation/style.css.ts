import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const signInJoinNavigation = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const navigationItem = style({
  textAlign: "center",
  textDecoration: "none",
  color: vars.fontColors.primary,
});

export const activeNavigationItem = style([
  navigationItem,
  {
    textDecoration: "underline",
  },
]);
