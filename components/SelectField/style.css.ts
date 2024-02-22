import { vars } from "../../app/theme.css";
import * as selectStyles from "../Select/style.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

export const selectFieldWrapper = style([
  selectStyles.select,
  { position: "relative" },
]);

export const selectFieldSelect = style({
  position: "relative",
  border: "none",
  background: "none",
  outline: "none",
  appearance: "none",
  top: 0,
  width: "100%",
  transition: "top 0.1s ease",
});

export const selectFieldPlaceholder = style({
  position: "absolute",
  pointerEvents: "none",
  top: 7,
  left: vars.spacing.normal,
  color: vars.fontColors.secondary,
  transition: "top 0.1s ease, left 0.1s ease 0.1s, padding 0.1s ease 0.1s",

  selectors: {
    [`${selectFieldSelect}:not(:placeholder-shown) ~ &`]: {
      padding: padding(0, vars.spacing.small),
      left: calc(vars.spacing.normal).subtract(vars.spacing.small).toString(),
      backgroundColor: vars.colors.white,
      lineHeight: 1,
      top: "-9px",
    },
  },
});
