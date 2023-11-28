import { style } from "@vanilla-extract/css";

export const signInJoinNavigation = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const navigationItem = style({
  textAlign: "center",
  textDecoration: "none",
});

export const activeNavigationItem = style([
  navigationItem,
  {
    textDecoration: "underline",
  },
]);
