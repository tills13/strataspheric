import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const attachInvoiceTextIcon = style({
  height: vars.sizes.xs,
});

export const attachInvoiceTextText = style({
  whiteSpace: "nowrap",
  textDecoration: "underline",
  fontWeight: vars.fontWeights.bold,
  cursor: "pointer",
  background: "none",
  border: "none",
});

const fileName = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  textTransform: "none",
});
