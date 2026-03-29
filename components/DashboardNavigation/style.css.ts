import {
  breakpoints,
  iconColorVar,
  sidebarWidthVar,
  vars,
} from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const GLOBAL_HEADER_HEIGHT_PX = 56;

export const sidebar = style({
  display: "none",
  width: sidebarWidthVar,
  borderRight: `1px solid ${vars.colors.borderDefault}`,
  backgroundColor: vars.surfaces.raised,

  "@media": {
    [breakpoints.tabletPlus]: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

const baseSidebarNavigationItem = style({
  borderRadius: vars.borderRadius.md,
  borderStyle: "solid",
  borderWidth: vars.borderWidth,
  borderColor: "transparent",
  textDecoration: "none",
  transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,
});

export const sidebarNavigationItem = style([
  baseSidebarNavigationItem,
  {
    color: vars.fontColors.secondary,
    selectors: {
      "&:hover": {
        backgroundColor: vars.surfaces.interactiveHover,
        color: vars.fontColors.primary,
      },
    },
  },
]);

export const activeSidebarNavigationItem = style([
  baseSidebarNavigationItem,
  {
    background: `linear-gradient(to right, color-mix(in srgb, ${vars.colors.primary} 32%, transparent), color-mix(in srgb, ${vars.colors.primary} 8%, transparent) 75%)`,
    borderColor: vars.colors.primary,
    color: vars.colors.primary,
    fontWeight: vars.fontWeights.medium,

    vars: {
      [iconColorVar]: vars.colors.primary,
    },
  },
]);

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
  height: GLOBAL_HEADER_HEIGHT_PX,
  backgroundColor: vars.surfaces.raised,

  "@media": {
    [breakpoints.tabletPlus]: {
      padding: padding(0, vars.spacing["20"]),
    },
  },
});

export const selectedStrataContainer = style({
  cursor: "pointer",
  height: GLOBAL_HEADER_HEIGHT_PX,
  overflow: "hidden",

  "@media": {
    [breakpoints.tabletPlus]: {
      borderBottom: `1px solid ${vars.colors.borderDefault}`,
      width: sidebarWidthVar,
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.surfaces.interactiveHover,
    },

    [`${globalHeader} &`]: {
      borderRight: `1px solid ${vars.colors.borderDefault}`,

      "@media": {
        [breakpoints.tabletPlus]: {
          display: "none",
        },
      },
    },
  },
});

export const globalHeaderBreadcrumbs = style({
  display: "none",
  flex: 1,
  overflowX: "auto",
  height: GLOBAL_HEADER_HEIGHT_PX,
  paddingLeft: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
      padding: 0,
    },
  },
});

export const userStrataSelectorText = style({
  fontFamily: vars.fontFamilies.primary,
  fontSize: vars.fontSizes.large,
  fontWeight: vars.fontWeights.xbold,
  whiteSpace: "nowrap",
  flex: 1,
  textOverflow: "ellipsis",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      fontSize: vars.fontSizes.medium,
    },
  },
});

const userStrataSelectorIconBase = style({
  position: "relative",
  transition: `left ${vars.transitions.slow}, opacity ${vars.transitions.slow}`,

  selectors: {
    [`${selectedStrataContainer}:hover &`]: {
      left: vars.spacing.xs,
    },
  },
});

export const userStrataSelectorIcon = styleVariants({
  false: [
    userStrataSelectorIconBase,
    {
      left: `-${vars.spacing.normal}`,
      opacity: 0,
    },
  ],
  true: [
    userStrataSelectorIconBase,
    {
      left: "0",
      opacity: 1,
    },
  ],
});

export const titleLink = style([
  linkStyles.noUnderline,
  { whiteSpace: "nowrap" },
]);

export const globalHeaderActionsDesktop = style({
  display: "none",
  "@media": {
    [breakpoints.tablet]: {
      display: "block",
    },
  },
});

export const globalMobileHeaderActions = style({
  display: "block",
  "@media": {
    [breakpoints.tablet]: {
      display: "none",
    },
  },
});

const globalMobileHeaderModalActions = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: vars.spacing.normal,
});

export const globalHeaderActionsButton = style({
  selectors: {
    [`${globalMobileHeaderModalActions} &`]: {
      width: "100%",
    },
  },
});

const baseSidebarSubNavigationItem = style({
  marginLeft: vars.spacing.small,
  borderRadius: vars.borderRadius.md,
  textDecoration: "none",
  transition: `background-color ${vars.transitions.fast}`,
});

export const sidebarSubNavigationItem = style([
  baseSidebarSubNavigationItem,
  {
    color: vars.fontColors.secondary,
    selectors: {
      "&:hover": {
        backgroundColor: vars.surfaces.interactiveHover,
        color: vars.fontColors.primary,
      },
    },
  },
]);

export const activeSidebarSubNavigationItem = style([
  baseSidebarSubNavigationItem,
  {
    backgroundColor: vars.surfaces.interactiveHover,
    color: vars.fontColors.primary,
    fontWeight: vars.fontWeights.medium,
  },
]);

export const sidebarBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: vars.sizes.xxs,
  height: vars.sizes.xxs,
  padding: `0 ${vars.spacing.xs}`,
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.blue50,
  color: vars.colors.blue700,
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.bold,
  lineHeight: vars.lineHeights.none,
  marginLeft: "auto",
});
