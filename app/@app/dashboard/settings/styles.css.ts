import { vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const centerContainer = style({
  maxWidth: 600,
  margin: "auto",
});

export const form = style({});

export const formElement = style({
  width: "100%",
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
