import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const eventWidget = style({});

export const eventWidgetList = style({
  flex: 1,
});

export const eventWidgetFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
