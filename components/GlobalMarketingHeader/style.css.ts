import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const globalHeader = style({
  borderBottom: `1px solid ${vars.colors.borderDefault}`,
  padding: `${vars.spacing["12"]} ${vars.spacing["20"]}`,
  backgroundColor: vars.surfaces.raised,
  position: "sticky",
  top: 0,
  zIndex: vars.zIndex.header,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [breakpoints.tablet]: {
      padding: `${vars.spacing["12"]} ${vars.spacing["24"]}`,
    },
  },
});

export const navLinks = style({
  display: "none",

  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
    },
  },
});

const animation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const logo = style({
  width: vars.sizes.large,
  fill: vars.colors.primary,
  animation: `${animation} 72s linear infinite`,
  pointerEvents: "none",

  "@media": {
    [breakpoints.tablet]: {
      width: vars.sizes.xl,
    },
  },
});

export const globalHeaderTitleWrapper = style({
  display: "flex",
  gap: vars.spacing.small,
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "flex-start",
    },
  },
});

export const globalHeaderTitle = style({
  fontSize: vars.fontSizes.larger,
  letterSpacing: vars.letterSpacing.wider,
  textTransform: "uppercase",
  fontWeight: vars.fontWeights.xbold,

  "@media": {
    [breakpoints.tablet]: {
      fontSize: vars.fontSizes.xl,
    },
  },
});
