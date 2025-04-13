import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const amenityChip = style({});

export const amentityImage = style({
  flexShrink: 0,
  objectFit: "cover",
  height: "auto",
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius,

  "@media": {
    [breakpoints.tablet]: {
      width: 128,
    },
  },
});

export const bookAmenityButton = style({
  flex: 1,

  "@media": {
    [breakpoints.tablet]: {
      flex: "unset",
    },
  },
});
