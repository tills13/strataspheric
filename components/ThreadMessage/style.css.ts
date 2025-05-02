import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const message = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: border("1px", "solid", vars.colors.borderDefault),
    },
  },
});

export const messageHighighted = style([
  message,
  {
    transition: "background-color 1s ease",
    backgroundColor: `color-mix(in srgb, ${vars.colors.orange100} 30%, transparent)`,
  },
]);

export const messageText = style({
  whiteSpace: "pre-wrap",
});
