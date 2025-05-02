import { breakpoints, sidebarWidthVar, vars } from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
});

export const userStrataSelectorContainer = style({
  borderRight: `1px solid ${vars.colors.borderDefault}`,
  cursor: "pointer",

  "@media": {
    [breakpoints.tabletPlus]: {
      width: sidebarWidthVar,
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const selectedStrataContainer = style({
  overflow: "hidden",
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
    [`${userStrataSelectorContainer}:hover &`]: {
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
      marginRight: vars.spacing.normal,
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
