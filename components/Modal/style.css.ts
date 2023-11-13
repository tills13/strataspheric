import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const modal = style({
  position: "fixed",
  inset: 0,
  top: 80,
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.white,
});
