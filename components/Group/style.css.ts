import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const group = style({
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
