import { style } from "@vanilla-extract/css";

export const wrapper = style({
  position: "relative",
});

export const container = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  whiteSpace: "nowrap",
});
