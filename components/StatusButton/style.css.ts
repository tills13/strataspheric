import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const formStatusButtonContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing.normal,
});

export const statusIcon = style({
  height: vars.sizes.small,
});
