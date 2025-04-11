import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const attachFileButton = style({
  overflow: "hidden",
  maxWidth: "100%",
});

export const attachFileTextIcon = style({
  height: vars.sizes.xs,
});

export const attachFileImagePreview = style({
  width: vars.sizes.large,
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius,
  objectFit: "cover",
});

export const attachFileTextText = style({
  whiteSpace: "nowrap",
  textDecoration: "underline",
  fontWeight: vars.fontWeights.bold,
  cursor: "pointer",
  background: "none",
  border: "none",
});

export const fileName = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  textTransform: "none",
});
