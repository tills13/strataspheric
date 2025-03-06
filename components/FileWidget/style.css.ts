import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const fileWidget = style({});

export const fileWidgetListItem = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey100,
  borderRadius: vars.borderRadius,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey200,
    },
  },
});

export const fileWidgetListItemDate = style({
  fontSize: vars.fontSizes.small,
  color: vars.fontColors.secondary,
});

export const fileWidgetListItemIcon = style({
  height: vars.sizes.xs,
});
