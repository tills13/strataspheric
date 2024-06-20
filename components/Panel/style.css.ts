import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const panel = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.white,
  border: border("2px", "solid", "#EFEFEF"),
  borderRadius: vars.borderRadius,
});
