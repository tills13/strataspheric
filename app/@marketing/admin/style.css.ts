import { GLOBAL_HEADER_HEIGHT_PX } from "../../../components/DashboardNavigation/style.css";
import { breakpoints, sidebarWidthVar, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const adminLayoutContainer = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",

  "@media": {
    [breakpoints.tabletPlus]: {
      gridTemplateColumns: "min-content auto",
      gridTemplateRows: "auto",
      height: "100vh",
      overflow: "hidden",
    },
  },
});

export const adminContentsContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100svh",
  overflowY: "auto",

  "@media": {
    [breakpoints.tabletPlus]: {
      height: "100%",
      maxHeight: "100vh",
    },
  },
});

export const adminSidebar = style({
  display: "none",
  width: sidebarWidthVar,
  borderRight: `1px solid ${vars.colors.borderDefault}`,

  "@media": {
    [breakpoints.tabletPlus]: {
      display: "block",
    },
  },
});

export const adminSidebarTitle = style({
  display: "flex",
  alignItems: "center",
  height: GLOBAL_HEADER_HEIGHT_PX,
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
  paddingLeft: vars.spacing.normal,
  paddingRight: vars.spacing.normal,
  fontWeight: vars.fontWeights.xbold,
  fontSize: vars.fontSizes.large,
  whiteSpace: "nowrap",
});

export const statCard = style({
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.colors.borderDefault}`,
  backgroundColor: vars.surfaces.raised,
  boxShadow: vars.shadows.sm,
});

export const statCardValue = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: vars.fontWeights.xbold,
  lineHeight: vars.lineHeights.tight,
});

export const statCardLabel = style({
  fontSize: vars.fontSizes.small,
  color: vars.fontColors.secondary,
  textTransform: "uppercase",
  fontWeight: vars.fontWeights.bold,
  letterSpacing: vars.letterSpacing.wider,
});
