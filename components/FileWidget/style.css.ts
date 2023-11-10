import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const fileWidget = style({});

export const fileWidgetList = style({
  flex: 1,
});

export const fileWidgetFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
