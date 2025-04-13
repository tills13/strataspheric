import { style, styleVariants } from "@vanilla-extract/css";

export const group = style({});

export const groupElement = styleVariants({
  default: {},
  fullWidth: { width: "100%" },
});

export const groupOverflow = styleVariants({
  hidden: {
    overflow: "hidden",
  },
});
