import { breakpoints, vars } from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import { style } from "@vanilla-extract/css";

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: vars.spacing.normal,
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
});

export const titleLink = style([
  linkStyles.noUnderline,
  {
    whiteSpace: "nowrap",
    fontFamily: vars.fontFamilies.primary,
    fontSize: vars.fontSizes.xl,
    fontWeight: vars.fontWeights.xbold,
  },
]);

export const globalHeaderActions = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  height: "100%",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
      alignItems: "center",
      height: "unset",
    },
  },
});

export const globalHeaderActionsDesktop = style({
  display: "none",
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
    },
  },
});

export const spacer = style({
  flex: 1,
});

export const sessionInfoRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,
});

export const sessionUserName = style({
  color: vars.colors.primary,
  whiteSpace: "nowrap",
});

export const globalMobileHeaderActions = style({
  display: "block",
  "@media": {
    [breakpoints.tablet]: {
      display: "none",
    },
  },
});

export const globalMobileHeaderModal = style({
  padding: vars.spacing.small,
});

export const hamburgerIcon = style({
  height: "24px",
});

export const globalMobileHeaderModalActions = style({
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

export const breadcrumbs = style({
  display: "flex",
  gap: vars.spacing.xs,
  alignItems: "baseline",
});
