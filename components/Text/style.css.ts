import { vars } from "../../app/theme.css";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const text = style({
  fontFamily: vars.fontFamilies.text,
  fontSize: vars.fontSizes.normal,
  lineHeight: 1.3,
});

export const textColors = styleVariants(
  Object.fromEntries(
    Object.entries(vars.fontColors).map(([colorName, m]) => [
      colorName,
      { color: m },
    ]),
  ) as Record<keyof typeof vars.fontColors, ComplexStyleRule>,
);
