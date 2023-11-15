import { createVar, style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const color = createVar();

export const wordmark = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
  position: "relative",
  textTransform: "uppercase",
  fontWeight: 900,
  color: color,
});

export const wordmarkLogo = style({ height: 50, fill: color });
