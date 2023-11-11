import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const fileWidget = style({});

export const fileWidgetListItemDate = style({
  fontSize: vars.fontSizes.small,
});

export const fileWidgetFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
