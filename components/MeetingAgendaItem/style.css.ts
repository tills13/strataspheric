import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const agendaItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  marginBottom: vars.spacing.normal,
  position: "relative",
});

export const agendaItemDone = style([
  agendaItem,
  { opacity: 0.5, textDecoration: "line-through" },
]);

export const agendaItemCheckboxPendingIcon = style({
  height: vars.sizes.xs,
});

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
