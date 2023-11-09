import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const loginForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const loginFormInput = style({
  width: "100%",
});
