import { vars } from "../../app/theme.css";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const gapVar = createVar();

export const group = style({
  display: "flex",
  gap: gapVar,
  flexDirection: "row",
});
export const groupElement = style({
  // width: "100%",
});

export const groupAlignment = styleVariants({
  default: {
    alignItems: "flex-start",
  },
  start: {
    alignItems: "flex-start",
  },
  end: {
    alignItems: "flex-end",
  },
  center: {
    alignItems: "center",
  },
});

export const groupJustification = styleVariants({
  default: {
    justifyContent: "flex-start",
  },
  start: {
    justifyContent: "flex-start",
  },
  end: {
    justifyContent: "flex-end",
  },
  "space-between": {
    justifyContent: "space-between",
  },
});

export const groupGap = styleVariants({
  xxs: { vars: { [gapVar]: vars.spacing.xxs } },
  xs: { vars: { [gapVar]: vars.spacing.xs } },
  small: { vars: { [gapVar]: vars.spacing.small } },
  normal: { vars: { [gapVar]: vars.spacing.normal } },
  large: { vars: { [gapVar]: vars.spacing.large } },
  xl: { vars: { [gapVar]: vars.spacing.xl } },
  xxl: { vars: { [gapVar]: vars.spacing.xxl } },
});
