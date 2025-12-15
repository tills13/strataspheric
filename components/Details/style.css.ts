import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const detailsRowSpacer = style({
  flex: 1,
  border: `1px dashed ${vars.colors.borderDefault}`,
});
