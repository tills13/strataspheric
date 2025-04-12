import { vars } from "../../app/theme.css";
import { field } from "../Form/style.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const gapVar = createVar();

export const group = style({
  display: "flex",
  gap: gapVar,
  flexDirection: "row",
});

export const groupElement = styleVariants({
  default: {},
  fullWidth: { width: "100%" },
});

export const groupOverflow = styleVariants({
  hidden: {
    overflow: "hidden",
  },
});

export const groupAlignment = styleVariants({
  default: {
    alignItems: "center",
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
  stretch: {
    alignItems: "stretch",
  },
});

export const groupJustification = styleVariants({
  default: {
    justifyContent: "flex-start",
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
  "space-between": {
    justifyContent: "space-between",
  },
});

export const groupGap = styleVariants({
  0: { vars: { [gapVar]: vars.spacing["0"] } },
  xxs: { vars: { [gapVar]: vars.spacing.xxs } },
  xs: { vars: { [gapVar]: vars.spacing.xs } },
  small: { vars: { [gapVar]: vars.spacing.small } },
  normal: { vars: { [gapVar]: vars.spacing.normal } },
  large: { vars: { [gapVar]: vars.spacing.large } },
  xl: { vars: { [gapVar]: vars.spacing.xl } },
  xxl: { vars: { [gapVar]: vars.spacing.xxl } },
});
