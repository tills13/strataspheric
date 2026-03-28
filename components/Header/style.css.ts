import { vars } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

const headerBase = style({
  fontFamily: vars.fontFamilies.secondaryHeader,
  lineHeight: vars.lineHeights.snug,
});

export const headerVariants = styleVariants({
  h1: [
    headerBase,
    {
      fontFamily: vars.fontFamilies.primaryHeader,
      fontSize: vars.fontSizes.xxl,
      letterSpacing: vars.letterSpacing.tight,
      lineHeight: vars.lineHeights.tight,
    },
  ],
  h2: [
    headerBase,
    {
      fontSize: vars.fontSizes.xl,
      letterSpacing: vars.letterSpacing.tight,
      lineHeight: vars.lineHeights.tight,
    },
  ],
  h3: [headerBase, { fontSize: vars.fontSizes.large }],
  h4: [headerBase, { fontSize: vars.fontSizes.medium }],
  h5: [headerBase, { fontSize: vars.fontSizes.normal }],
  h6: [headerBase, { fontSize: vars.fontSizes.normal }],
  default: [
    headerBase,
    {
      fontSize: vars.fontSizes.normal,
    },
  ],
});
