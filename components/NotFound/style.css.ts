import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const contentContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: vars.spacing["20"],
  padding: vars.spacing["48"],
});
