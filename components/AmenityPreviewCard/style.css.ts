import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const amenityImage = style({
  flexShrink: 0,
  objectFit: "cover",
  height: "auto",
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius.lg,

  "@media": {
    [breakpoints.tablet]: {
      width: vars.sizes.xxl2,
    },
  },
});
