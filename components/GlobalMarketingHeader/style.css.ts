import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const globalHeader = style({
  position: "relative",
  borderBottom: 0,
  padding: 0,
  marginBottom: 80,

  "@media": {
    [breakpoints.tablet]: {
      marginBottom: 180,
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
  position: "absolute",
  width: "300px",
  left: "-150px",
  top: "-150px",
  fill: vars.colors.grey700,
  animation: `${animation} 72s linear infinite`,
  pointerEvents: "none",

  "@media": {
    [breakpoints.tablet]: {
      width: "500px",
      left: "-250px",
      top: "-250px",
    },
  },
});

export const globalHeaderTitle = style({
  display: "block",
  zIndex: 1,
  width: "100%",
  textAlign: "right",
  whiteSpace: "nowrap",
  padding: padding(vars.spacing.small, vars.spacing.normal),

  fontSize: vars.fontSizes.xl,
  fontWeight: 900,
  textTransform: "uppercase",

  "@media": {
    [breakpoints.tablet]: {
      textAlign: "center",
      fontSize: vars.fontSizes.xxl,
      padding: 0,
    },
  },
});
