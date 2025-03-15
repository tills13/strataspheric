import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const dividerTextText = style({
  whiteSpace: "nowrap",
});

export const dividerText = style({
  display: "flex",
  alignItems: "center",
});

export const dividerTextDivider = style({
  display: "block",
  height: "2px",
  width: "100%",
  backgroundColor: vars.colors.borderDefault,
});
