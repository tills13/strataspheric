import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const pageTitle = style({
  marginBottom: vars.spacing.large,
});

export const form = style({
  maxWidth: 600,
  margin: "auto",
});

export const visibilityLabel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const isPublicField = style({
  display: "flex",
  gap: vars.spacing.normal,
  alignItems: "center",
  justifyContent: "space-between",
});
