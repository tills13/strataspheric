import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const getStartedForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const isPublicField = style({
  display: "flex",
  gap: vars.spacing.normal,
  alignItems: "center",
});
