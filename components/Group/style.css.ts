import { vars } from "../../app/theme.css";
import { fieldBaseActionContainer } from "../Form/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const group = style({
  selectors: {},
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
