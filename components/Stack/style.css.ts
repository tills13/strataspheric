import { style } from "@vanilla-extract/css";

export const stack = style({
  display: "flex",
  flexDirection: "column",
});

export const stackElement = style({
  selectors: {
    "&:not(:last-child)": {},
  },
});
