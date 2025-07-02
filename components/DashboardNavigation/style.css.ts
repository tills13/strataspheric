import {
  breakpoints,
  iconColorVar,
  sidebarWidthVar,
  vars,
} from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const GLOBAL_HEADER_HEIGHT_PX = 57;

export const sidebar = style({
  display: "none",
  width: sidebarWidthVar,
  borderRight: `1px solid ${vars.colors.borderDefault}`,

  "@media": {
    [breakpoints.tabletPlus]: {
      display: "block",
    },
  },
});

const baseSidebarNavigationItem = style({
  borderRadius: vars.borderRadius,
  textDecoration: "none",
});

export const sidebarNavigationItem = style([
  baseSidebarNavigationItem,
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
export const activeSidebarNavigationItem = style([
  baseSidebarNavigationItem,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
    fontWeight: vars.fontWeights.bold,

    vars: {
      [iconColorVar]: vars.colors.white,
    },
  },
]);

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
  height: GLOBAL_HEADER_HEIGHT_PX,

  "@media": {
    [breakpoints.tabletPlus]: {
      padding: padding(0, vars.spacing.normal),
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
      backgroundColor: vars.colors.grey100,
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
      fontSize: vars.fontSizes.normal,
    },
  },
});

const userStrataSelectorIconBase = style({
  position: "relative",
  transition: "left 1s ease, opacity 1s ease",

  selectors: {
    [`${selectedStrataContainer}:hover &`]: {
      left: "5px",
    },
  },
});

export const userStrataSelectorIcon = styleVariants({
  false: [
    userStrataSelectorIconBase,
    {
      left: "-20px",
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
