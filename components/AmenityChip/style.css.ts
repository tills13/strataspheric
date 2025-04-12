import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const amenityChip = style({});

export const amentityImage = style({
  flexShrink: 0,
  objectFit: "cover",
  width: 128,
  height: "auto",
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius,
});
