import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const file = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: vars.spacing.small,
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  color: "inherit",
  borderRadius: vars.borderRadius,
  textOverflow: "ellipsis",
  overflow: "hidden",
});

export const icon = style({
  height: "24px",
  verticalAlign: "top",
  flexShrink: 0,
});
