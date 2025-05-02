import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const panel = style({
  backgroundColor: vars.colors.grey0,
  border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
  borderRadius: vars.borderRadius,
});
