import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const text = style({});

export const textLineHeight = style({
  lineHeight: vars.lineHeights.snug,
});

export const textColorInherit = style({
  color: "inherit",
});
