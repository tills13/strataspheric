import { iconColorVar, vars } from "../../app/theme.css";
import { invoiceChip } from "../InvoiceChip/style.css";
import { style } from "@vanilla-extract/css";

export const timelineEntry = style({
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
});

export const timelineEntryHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
});

export const timelineEntryMessage = style({
  padding: vars.spacing.normal,
  whiteSpace: "pre-line",
});

export const timelineEntryDate = style({
  fontSize: vars.fontSizes.small,
  lineHeight: "20px",
  color: vars.colors.grey400,
});

export const timelineAttachment = style({});

export const timelineEntryAddToAgendaButton = style({
  color: vars.colors.white,
  vars: {
    [iconColorVar]: vars.colors.white,
  },
});
