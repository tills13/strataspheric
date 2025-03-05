import { vars } from "../../app/theme.css";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const gapVar = createVar();

export const elementGroup = style({});
export const elementGroupElement = style({
  width: "100%",
  selectors: {
    "&:not(:last-child)": {
      marginBottom: gapVar,
    },
  },
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
  tiny: { vars: { [gapVar]: vars.spacing.xs } },
  small: { vars: { [gapVar]: vars.spacing.small } },
  normal: { vars: { [gapVar]: vars.spacing.normal } },
  large: { vars: { [gapVar]: vars.spacing.large } },
  huge: { vars: { [gapVar]: vars.spacing.xl } },
});
