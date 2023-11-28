import { style } from "@vanilla-extract/css";

export const link = style({
  color: "inherit",
  selectors: {
    "&:active": {
      color: "inherit",
    },
    "&:visited": {
      color: "inherit",
    },
  },
});

export const noUnderline = style([
  link,
  {
    textDecoration: "none",
  },
]);
