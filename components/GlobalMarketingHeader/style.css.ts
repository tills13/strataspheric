import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const globalHeader = style({
  position: "sticky",
  top: 0,
  borderBottom: 0,
  marginBottom: vars.spacing.large,
  padding: `${vars.spacing.xs} ${vars.spacing.normal} ${vars.spacing.xs} ${vars.spacing.xs}`,
  backgroundColor: vars.colors.white,
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
  width: vars.sizes.xxl,
  fill: vars.colors.primary,
  animation: `${animation} 72s linear infinite`,
  pointerEvents: "none",
});

export const globalHeaderTitleWrapper = style({
  display: "flex",
  gap: vars.spacing.xs,
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "flex-start",
    },
  },
});

export const globalHeaderTitle = style({
  fontSize: vars.fontSizes.xl,
  textTransform: "uppercase",

  "@media": {
    [breakpoints.tablet]: {
      fontSize: vars.fontSizes.xxl,
    },
  },
});
