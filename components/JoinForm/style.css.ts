import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const signInFormCheckboxWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: vars.fontFamilies.secondaryHeader,
});
