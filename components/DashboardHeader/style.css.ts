import { breakpoints, vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { important } from "../../theme";

export const numHeaderItemsVar = createVar();

export const subheader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100vw",
  gap: vars.spacing.normal,
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
});

export const linksRail = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",
  height: calc(vars.sizes.small).toString(),
  overflow: "hidden",
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
  },
]);

export const baseSubheaderLink = style({
  padding: `${vars.spacing.xs} 0`,
  whiteSpace: "nowrap",

  "@media": {
    [breakpoints.tablet]: {
      padding: `${vars.spacing.xs} ${vars.spacing.small}`,
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
});

export const mobileDropdownAction = style({
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
