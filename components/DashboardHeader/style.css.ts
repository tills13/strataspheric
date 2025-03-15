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
    [breakpoints.tablet]: {
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
      [breakpoints.tablet]: {
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
      [breakpoints.tablet]: {
        display: "none",
      },
    },
  },
]);

export const mobileMenuText = style({
  flex: 1,
});

export const baseSubheaderLink = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,

  height: vars.sizes.small,
  lineHeight: vars.sizes.small,
  whiteSpace: "nowrap",
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
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
  {
    color: vars.fontColors.primary,
    fontWeight: vars.fontWeights.xbold,
    textDecoration: "none",
    order: 1,

    "@media": {
      [breakpoints.tablet]: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.white,
        borderRadius: vars.borderRadius,
        order: 2,
      },
    },
  },
]);

export const actionsContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  // marginRight: calc(vars.spacing.small).add(vars.sizes.small).toString(),

  "@media": {
    [breakpoints.tablet]: {
      marginRight: "unset",
    },
  },
});

export const mobileDropdownAction = style({
  // position: important("absolute"),
  // right: vars.spacing.normal,
  // top: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {
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
