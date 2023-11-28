import { vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as dropdownActionsStyles from "../DropdownActions/style.css";
import * as iconButtonStyles from "../IconButton/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const icon = style({
  display: "inline",
  selectors: {
    [`${buttonStyles.buttonVariants.primary} &`]: {
      fill: vars.colors.white,
    },
    [`${iconButtonStyles.iconButton} &`]: {
      height: "20px",
      margin: "auto",
    },
    [`${dropdownActionsStyles.actionRow} &`]: {
      height: "20px",
    },
  },
});

export const iconVariants = styleVariants({
  primary: {
    fill: vars.fontColors.primary,
  },
});
