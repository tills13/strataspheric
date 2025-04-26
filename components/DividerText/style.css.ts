import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const dividerTextDivider = style({
  display: "block",
  height: vars.borderWidth,
  width: "100%",
  backgroundColor: vars.colors.borderDefault,
});
