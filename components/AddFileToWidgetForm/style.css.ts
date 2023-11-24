import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const addFileToWidgetForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
