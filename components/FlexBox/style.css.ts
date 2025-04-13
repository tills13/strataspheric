import { vars } from "../../app/theme.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const flexBox = style({
  display: "flex",
});

export const alignItems = styleVariants({
  start: { alignItems: "flex-start" },
  end: { alignItems: "flex-end" },
  center: { alignItems: "center" },
  stretch: { alignItems: "stretch" },
});

export const gap = styleVariants({
  "0": { gap: vars.spacing["0"] },
  xxs: { gap: vars.spacing.xxs },
  xs: { gap: vars.spacing.xs },
  small: { gap: vars.spacing.small },
  normal: { gap: vars.spacing.normal },
  large: { gap: vars.spacing.large },
  xl: { gap: vars.spacing.xl },
  xxl: { gap: vars.spacing.xxl },
});

export const justifyContent = styleVariants({
  start: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  "space-between": { justifyContent: "space-between" },
});

export const direction = styleVariants({
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
});
