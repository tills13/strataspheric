import { style } from "@vanilla-extract/css";

export const attachFileButton = style({
  overflow: "hidden",
  maxWidth: "100%",
});

export const fileName = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
});
