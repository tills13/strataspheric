import { vars } from "../../app/theme.css";
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const gapVar = createVar();

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: gapVar,
});
export const stackElement = style({
  selectors: {
    "&:not(:last-child)": {
      // marginBottom: gapVar,
    },
  },
});

export const stackGap = styleVariants({
  0: { vars: { [gapVar]: vars.spacing["0"] } },
  xxs: { vars: { [gapVar]: vars.spacing.xxs } },
  xs: { vars: { [gapVar]: vars.spacing.xs } },
  small: { vars: { [gapVar]: vars.spacing.small } },
  normal: { vars: { [gapVar]: vars.spacing.normal } },
  large: { vars: { [gapVar]: vars.spacing.large } },
  xl: { vars: { [gapVar]: vars.spacing.xl } },
  xxl: { vars: { [gapVar]: vars.spacing.xxl } },
});
