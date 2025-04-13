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
          zIndex: "1012",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderColor: vars.colors.borderDefault,
          borderBottom: "none",
          backgroundColor: vars.colors.white,
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
  display: "none",
  marginTop: calc(vars.spacing.normal).negate().toString(),
  opacity: 0,

  transition: "opacity 0.25s ease, margin-top 0.25s ease",
  backgroundColor: vars.colors.white,
  zIndex: vars.zIndex.modal,

  selectors: {
    [`${dropdownButtonOpen} &`]: {
      transition: "opacity 0.25s ease, margin-top 0.25s ease",
      display: "block",
      opacity: 1,
      marginTop: "-2px",
    },
  },

  "@media": {
    [breakpoints.tablet]: {
      position: "absolute",
      top: "unset",
      bottom: "unset",
      left: "unset",

      width: 400,
      border: border("2px", "solid", vars.colors.borderDefault),
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
