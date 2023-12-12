import { vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as dropdownActionsStyles from "../DropdownActions/style.css";
import * as iconButtonStyles from "../IconButton/style.css";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const iconColorVar = createVar();

export const icon = style({
  display: "inline",
  fill: fallbackVar(iconColorVar, vars.colors.primary),
  selectors: {
    [`${buttonStyles.colors.primary} &`]: {
      fill: vars.colors.white,
    },
    [`${iconButtonStyles.iconButton} &`]: {
      height: "24px",
      margin: "auto",
    },
    [`${dropdownActionsStyles.actionRow} &`]: {
      height: "24px",
    },
  },
});
