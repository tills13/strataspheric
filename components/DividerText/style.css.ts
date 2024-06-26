import { vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

export const dividerTextGapVar = createVar();

export const dividerTextText = style({
  whiteSpace: "nowrap",
});

export const dividerText = style({
  display: "flex",
  alignItems: "center",
  gap: dividerTextGapVar,
});

export const dividerTextDivider = style({
  display: "block",
  height: "2px",
  width: "100%",
  backgroundColor: vars.colors.borderDefault,
});
