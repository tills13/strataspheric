import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const attachFileButton = style({
  overflow: "hidden",
  maxWidth: "100%",
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
