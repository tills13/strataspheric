import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const fileWidget = style({});

export const fileWidgetListItem = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.surfaces.sunken,
  borderRadius: vars.borderRadius.md,
  transition: `background-color ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey200,
    },
  },
});

export const fileWidgetListItemTitle = style({
  fontSize: vars.fontSizes.medium,
  fontWeight: vars.fontWeights.bold,
});

export const fileWidgetListItemDate = style({
  fontSize: vars.fontSizes.small,
  color: vars.fontColors.secondary,
});

export const fileWidgetListItemIcon = style({
  height: vars.sizes.xs,
});
