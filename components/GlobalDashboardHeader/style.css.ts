import { breakpoints, vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as linkStyles from "../Link/style.css";
import { style } from "@vanilla-extract/css";

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: vars.spacing.normal,
  borderBottom: `1px solid ${vars.colors.grey100}`,
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

export const globalHeaderActions = style({});

export const sessionUserName = style({
  whiteSpace: "nowrap",
});

export const globalHeaderDesktopActions = style({
  display: "none",
  alignItems: "center",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
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

export const hamburgerIcon = style({
  height: "24px",
});

export const globalMobileHeaderModalActions = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: vars.spacing.normal,
});

export const globalHeaderActionsButton = style([
  buttonStyles.button,
  buttonStyles.buttonSizes.normal,
  {
    selectors: {
      [`${globalMobileHeaderModalActions} &`]: {
        width: "100%",
      },
    },
  },
]);

export const breadcrumbs = style({
  display: "flex",
  gap: vars.spacing.xs,
  alignItems: "baseline",
});
