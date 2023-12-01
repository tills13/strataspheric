import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const timelineIcon = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: vars.sizes.small,
  width: vars.sizes.small,
  backgroundColor: vars.colors.primary,
  borderRadius: "50%",
});

export const timelineIconIcon = style({
  height: vars.sizes.xxs,
  fill: vars.colors.white,
});
