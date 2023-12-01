import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const agendaItem = style({
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey100,
  marginBottom: vars.spacing.normal,
  position: "relative",
});

export const agendaItemDone = style([
  agendaItem,
  { opacity: 0.5, textDecoration: "line-through" },
]);

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,
  marginBottom: vars.spacing.normal,
});

export const agendaItemDescription = style({
  whiteSpace: "pre-line",
  marginBottom: vars.spacing.normal,
});

export const agendaItemActions = style({
  position: "absolute",
  top: vars.spacing.normal,
  right: vars.spacing.normal,
  display: "flex",
  gap: vars.spacing.small,
});
