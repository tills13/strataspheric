import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const modal = style({
  position: "fixed",
  inset: 0,
  top: 80,
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.white,
});
