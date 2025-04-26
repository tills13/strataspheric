import {
  breakpoints,
  iconColorVar,
  sidebarWidthVar,
  vars,
} from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const navigation = style({
  display: "none",
  width: sidebarWidthVar,
  borderRight: `1px solid ${vars.colors.borderDefault}`,

  "@media": {
    [breakpoints.tabletPlus]: {
      display: "block",
    },
  },
});

const baseNavigationItem = style({
  borderRadius: vars.borderRadius,
  textDecoration: "none",
});
export const navigationItem = style([
  baseNavigationItem,
  {
    color: vars.colors.primary,
    selectors: {
      "&:hover": {
        backgroundColor: vars.colors.grey100,
        textDecoration: "underline",
      },
    },
  },
]);
export const activeNavigationItem = style([
  baseNavigationItem,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
    fontWeight: vars.fontWeights.bold,

    vars: {
      [iconColorVar]: vars.colors.white,
    },
  },
]);
