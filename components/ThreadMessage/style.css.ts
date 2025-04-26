import { vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const message = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
  },
});

const highlightAnimation = keyframes({
  "25%": {
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 60%, transparent)`,
  },
  "100%": {
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 30%, transparent)`,
  },
});

export const messageHighighted = style([
  message,
  {
    transition: "background-color 1s ease",
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 30%, transparent)`,
    // animation: `${highlightAnimation} 1s ease forwards`,
  },
]);

export const messageText = style({
  whiteSpace: "pre-wrap",
});
