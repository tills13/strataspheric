import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const newFileForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const isPublicWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
