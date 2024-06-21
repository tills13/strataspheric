import { style } from "@vanilla-extract/css";

export const confirmClickableText = style({
  cursor: "pointer",

  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
