import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { colorMix } from "../../styles/utils";
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
    transition: `background-color ${vars.transitions.slow}`,
    backgroundColor: colorMix(vars.colors.orange100, 30),
  },
]);
