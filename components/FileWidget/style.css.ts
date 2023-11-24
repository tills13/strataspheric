import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const fileWidget = style({});

export const fileWidgetListItemDate = style({
  fontSize: vars.fontSizes.small,
});

export const fileWidgetFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});

export const fileActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});
