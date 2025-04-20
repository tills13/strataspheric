import { vars } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { border } from "../../theme";

export const panel = style({
  backgroundColor: vars.colors.grey0,
  border: border("2px", "solid", vars.colors.borderDefault),
  borderRadius: vars.borderRadius,
});
