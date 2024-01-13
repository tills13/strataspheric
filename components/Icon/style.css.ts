import { iconColorVar, vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as dropdownActionsStyles from "../DropdownActions/style.css";
import { timelineIconContainer } from "../Timeline/style.css";
import { fallbackVar, style } from "@vanilla-extract/css";

export const icon = style({
  display: "inline",
  fill: fallbackVar(iconColorVar, vars.colors.primary),
  maxWidth: "unset",
  selectors: {
    [`${buttonStyles.button.classNames.base} &`]: {
      height: "24px",
      margin: "auto",
    },
    [`${buttonStyles.button.classNames.variants.size.small} &`]: {
      height: "18px",
      margin: "auto",
    },
    [`${dropdownActionsStyles.actionRow} &`]: {
      height: "24px",
    },
    [`${timelineIconContainer} &`]: {
      height: vars.sizes.xxs,
    },
  },
});
