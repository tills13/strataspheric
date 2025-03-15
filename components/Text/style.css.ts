import { vars } from "../../app/theme.css";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const text = style({
  fontFamily: vars.fontFamilies.text,
  fontSize: vars.fontSizes.normal,
  lineHeight: 1.3,
});

export const textColorInherit = style({
  color: "inherit",
});

export const textNoWrap = style({
  whiteSpace: "nowrap",
});

export const textColors = styleVariants(
  Object.fromEntries(
    Object.entries(vars.fontColors).map(([colorName, color]) => [
      colorName,
      { color },
    ]),
  ) as Record<keyof typeof vars.fontColors, ComplexStyleRule>,
);

export const textSizes = styleVariants(
  Object.fromEntries(
    Object.entries(vars.fontSizes).map(([fontSizeName, fontSize]) => [
      fontSizeName,
      { fontSize },
    ]),
  ) as Record<keyof typeof vars.fontSizes, ComplexStyleRule>,
);

export const textWeights = styleVariants(
  Object.fromEntries(
    Object.entries(vars.fontWeights).map(([fontWeightName, fontWeight]) => [
      fontWeightName,
      { fontWeight },
    ]),
  ) as Record<keyof typeof vars.fontWeights, ComplexStyleRule>,
);
