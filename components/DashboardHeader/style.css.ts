import { breakpoints, vars } from "../../app/theme.css";
import { icon } from "../Icon/style.css";
import { createVar, style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { important, padding } from "../../theme";

export const numHeaderItemsVar = createVar();

export const subHeaderContainer = style({
  "@media": {
    [breakpoints.tabletPlus]: {
      display: "none",
    },
  },
});

export const subheader = style({
  position: "relative",
  width: "100vw",
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
});

export const linksRail = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",
  height: calc(vars.sizes.small).toString(),
  overflow: "hidden",
  width: "100%",
  transition: "height 0.5s ease",

  "@media": {
    [breakpoints.tabletPlus]: {
      flexDirection: "row",
      flex: 1,
      overflow: "auto",
    },
  },
});

export const linksRailOpen = style([
  linksRail,
  {
    height: calc(numHeaderItemsVar)
      .multiply(vars.sizes.small)
      .add(calc(numHeaderItemsVar).subtract(1).multiply(vars.spacing.small))
      .toString(),

    "@media": {
      [breakpoints.tabletPlus]: {
        height: calc(vars.sizes.small).toString(),
      },
    },
  },
]);

export const mobileMenuIcon = style([
  icon,
  {
    display: "inline",
    height: vars.sizes.xs,

    "@media": {
      [breakpoints.tabletPlus]: {
        display: "none",
      },
    },
  },
]);

export const mobileMenuText = style({
  flex: 1,
});

const baseSubheaderLink = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,

  height: vars.sizes.small,
  lineHeight: vars.sizes.small,
  whiteSpace: "nowrap",
  width: "100%",

  "@media": {
    [breakpoints.tabletPlus]: {
      width: "auto",
      padding: padding(0, vars.spacing.small),
    },
  },
});

export const subheaderLink = style([
  baseSubheaderLink,
  {
    color: vars.fontColors.primary,
    order: 2,
  },
]);

export const activeSubheaderLink = style([
  baseSubheaderLink,
  { height: "100%", order: 1 },
]);

export const mobileDropdownAction = style({
  "@media": {
    [breakpoints.tabletPlus]: {
      display: important("none"),
    },
  },
});

export const toggleMobileDropdownIcon = style({
  transform: "rotate(0deg)",
  transition: "transform 0.2s ease",
});

export const toggleMobileDropdownIconActive = style([
  toggleMobileDropdownIcon,
  {
    transform: "rotate(180deg)",
  },
]);
