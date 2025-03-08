import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const text = style({
  fontFamily: vars.fontFamilies.text,
  fontSize: vars.fontSizes.normal,
  lineHeight: 1.3,
});
