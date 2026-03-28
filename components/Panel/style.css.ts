import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const panel = style({
  backgroundColor: vars.surfaces.raised,
  border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
  borderRadius: vars.borderRadius.lg,
  boxShadow: vars.shadows.sm,
});
