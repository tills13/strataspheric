import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const agendaItem = style({
  position: "relative",
});

export const agendaItemDone = style([agendaItem, { opacity: 0.5 }]);

export const agendaItemCheckboxPendingIcon = style({
  height: vars.sizes.xs,
});

export const headerHeader = style({
  flex: 1,
  lineHeight: vars.sizes.xs,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const agendaItemDescription = style({
  whiteSpace: "pre-line",
});
