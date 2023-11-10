import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const gapVar = createVar();

export const elementGroup = style({
  display: "flex",
  gap: [gapVar, vars.spacing.normal],
});

export const elementGroupOrientation = styleVariants({
  row: [elementGroup, { flexDirection: "row" }],
  column: [elementGroup, { flexDirection: "column" }],
});

export const horizontalAlignment = styleVariants({
  spaceBetween: {
    justifyContent: "space-between",
  },
  start: {
    justifyContent: "flex-start",
  },
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
});

export const verticalAlignment = styleVariants({
  start: {
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  end: {
    alignItems: "flex-end",
  },
});

export const elementGroupGap = styleVariants({
  tiny: { gap: vars.spacing.xs },
  small: { gap: vars.spacing.small },
  normal: { gap: vars.spacing.normal },
  large: { gap: vars.spacing.large },
  huge: { gap: vars.spacing.xl },
});
