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
      fontSize: vars.fontSizes.xl,
    },
  ],
  h2: [headerBase, { fontSize: vars.fontSizes.large }],
  h3: [headerBase, { fontSize: "20px" }],
  h4: [headerBase, { fontSize: vars.fontSizes.normal }],
  h5: [headerBase, { fontSize: vars.fontSizes.small }],
  h6: [headerBase, { fontSize: vars.fontSizes.small }],
  default: [
    headerBase,
    {
      fontSize: vars.fontSizes.normal,
    },
  ],
});
