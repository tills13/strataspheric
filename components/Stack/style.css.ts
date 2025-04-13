import { style } from "@vanilla-extract/css";

export const stack = style({});

export const stackElement = style({
  selectors: {
    "&:not(:last-child)": {},
  },
});
