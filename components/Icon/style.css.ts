import { iconColorVar, vars } from "../../app/theme.css";
import * as buttonStyles from "../Button/style.css";
import * as dropdownActionsStyles from "../DropdownActions/style.css";
import { timelineIconContainer } from "../Timeline/style.css";
import {
  ComplexStyleRule,
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const dynamicIconHeightVar = createVar();

export const icon = style({
  fill: fallbackVar(iconColorVar, vars.colors.primary),
  flexShrink: 0,
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

export const iconSize = styleVariants(
  Object.fromEntries(
    Object.entries(vars.sizes).map(([sizeName, height]) => [
      sizeName,
      { height },
    ]),
  ) as Record<keyof typeof vars.sizes, ComplexStyleRule>,
);

export const iconWithDynamicHeight = style([
  icon,
  { height: dynamicIconHeightVar },
]);
