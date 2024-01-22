import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const headerActions = style({
  display: "flex",
  gap: vars.spacing.small,
});

export const weekPicker = style({
  height: 60,
});
