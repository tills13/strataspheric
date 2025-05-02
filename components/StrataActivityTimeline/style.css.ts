import { iconColorVar, vars } from "../../app/theme.css";
import { buttonBase } from "../Button/style.css";
import { style } from "@vanilla-extract/css";

export const timelineEntry = style({
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
});

export const timelineEntryAddToAgendaButton = style([
  buttonBase,
  {
    color: vars.colors.white,
    backgroundColor: vars.colors.grey800,
    border: vars.colors.grey800,

    selectors: {
      "&:hover": {
        backgroundColor: vars.colors.grey900,
        border: vars.colors.grey900,
      },
    },

    vars: {
      [iconColorVar]: vars.colors.white,
    },
  },
]);
