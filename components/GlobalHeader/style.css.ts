import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const globalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: vars.spacing.normal,
  borderBottom: `1px solid ${vars.colors.grey100}`,
});

export const globalHeaderActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,
});

export const breadcrumbs = style({
  display: "flex",
  gap: vars.spacing.xs,
  alignItems: "baseline",
});
