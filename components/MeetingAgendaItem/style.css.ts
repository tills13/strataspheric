import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const agendaItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
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
  gap: vars.spacing.normal,
});

export const headerHeader = style({
  flex: 1,
  lineHeight: vars.sizes.xs,
});

export const agendaItemDescription = style({
  whiteSpace: "pre-line",
});

export const agendaItemActions = style({
  display: "flex",
  gap: vars.spacing.small,
});
