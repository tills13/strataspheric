import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const attachFileImagePreview = style({
  width: vars.sizes.large,
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius,
  objectFit: "cover",
});
