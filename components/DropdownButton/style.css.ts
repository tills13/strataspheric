import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { border } from "../../theme";

export const dropdownButton = style({
  "@media": {
    [breakpoints.tablet]: {
      position: "relative",
    },
  },
});

export const dropdownButtonOpen = style({});

export const dropdownButtonButton = style({
  "@media": {
    [breakpoints.tablet]: {
      transition: "background-color 0.25s ease, border-color 0.25s ease",
      selectors: {
        [`${dropdownButtonOpen} &`]: {
          zIndex: "10",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderColor: vars.colors.borderDefault,
          borderBottom: "none",
          backgroundColor: vars.colors.white,
        },
        "&:active": {
          borderBottom: "none",
        },
      },
    },
  },
});

export const panelWrapper = style({
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  marginTop: calc(vars.spacing.normal).negate().toString(),
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.25s ease, margin-top 0.25s ease",

  // display: "none",
  // transition: "all 1s ease allow-discrete",
  // transitionProperty: "display, opacity, margin-top",
  // "transition-behaviour": "allow-discrete",

  backgroundColor: vars.colors.white,
  zIndex: "9",

  selectors: {
    [`${dropdownButtonOpen} &`]: {
      opacity: 1,
      marginTop: calc(vars.borderWidth).negate().toString(),
      pointerEvents: "initial",
      // display: "block",
    },
  },

  "@media": {
    [breakpoints.tablet]: {
      position: "absolute",
      top: "unset",
      bottom: "unset",
      left: "unset",

      width: 400,
      border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
      borderRadius: vars.borderRadius,
      borderTopRightRadius: 0,
    },
  },
});

export const panelWrapperUp = style([
  panelWrapper,
  {
    marginTop: "unset",
    marginBottom: vars.spacing.xs,
    bottom: "100%",
  },
]);
