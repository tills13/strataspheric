import { breakpoints, vars } from "../../app/theme.css";
import { GLOBAL_HEADER_HEIGHT_PX } from "../DashboardNavigation/style.css";
import { style } from "@vanilla-extract/css";

export const mobileNav = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: GLOBAL_HEADER_HEIGHT_PX,
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
  paddingLeft: vars.spacing.normal,
  paddingRight: vars.spacing.small,

  "@media": {
    [breakpoints.tabletPlus]: {
      display: "none",
    },
  },
});

export const mobileNavTitle = style({
  fontWeight: vars.fontWeights.xbold,
  fontSize: vars.fontSizes.large,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
