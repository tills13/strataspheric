import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const eventWidget = style({});

export const eventWidgetFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
