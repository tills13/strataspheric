import { vars } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const headerBase = style({
  fontFamily: vars.fontFamilies.secondaryHeader,
  lineHeight: 1.3,
});

export const headerVariants = styleVariants({
  h1: [
    headerBase,
    {
      fontFamily: vars.fontFamilies.primaryHeader,
      fontSize: 36,
    },
  ],
  h2: [
    headerBase,
    {
      fontSize: 24,
    },
  ],
  h3: [
    headerBase,
    {
      fontSize: 16,
    },
  ],
  default: [
    headerBase,
    {
      fontSize: 14,
    },
  ],
});
