import { vars } from "../../app/theme.css";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const gapVar = createVar();

export const elementGroup = style({
  display: "flex",
  gap: gapVar,
});
export const elementGroupElement = style({
  width: "100%",
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
  xxs: { vars: { [gapVar]: vars.spacing.xxs } },
  xs: { vars: { [gapVar]: vars.spacing.xs } },
  small: { vars: { [gapVar]: vars.spacing.small } },
  normal: { vars: { [gapVar]: vars.spacing.normal } },
  large: { vars: { [gapVar]: vars.spacing.large } },
  xl: { vars: { [gapVar]: vars.spacing.xl } },
  xxl: { vars: { [gapVar]: vars.spacing.xxl } },
});
