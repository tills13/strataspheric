import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const nothingHereStack = style({
  display: "grid",
  gridTemplateAreas: '"stack"',
});

export const nothingHereStackElement = style({
  gridArea: "stack",
});

export const nothingHereQuestionMark = style({
  fontSize: calc(vars.sizes.xxl2).multiply(1.5).toString(),
  lineHeight: vars.sizes.xxl3,
  fontWeight: vars.fontWeights.xbold,
  color: vars.colors.white,
  textAlign: "center",
});
