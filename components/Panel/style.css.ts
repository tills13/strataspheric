import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const panel = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey0,
  border: border("2px", "solid", vars.colors.borderDefault),
  borderRadius: vars.borderRadius,
});
