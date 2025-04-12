import { breakpoints, iconColorVar, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const timeline = style({
  paddingBottom: vars.spacing.small,
});

export const timelineEmptyMessage = style({
  color: vars.fontColors.secondary,
});

export const timelineItem = style({
  position: "relative",
  padding: vars.spacing.small,
  paddingLeft: calc(vars.sizes.xs).add(vars.spacing.small).toString(),
  paddingRight: 0,
  minHeight: calc(vars.sizes.xs).toString(),

  selectors: {
    "&:before": {
      position: "absolute",
      content: " ",
      left: calc(vars.sizes.xs).divide(2).subtract("2px").toString(),
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: vars.colors.primary,
    },
    "&:first-child": {
      paddingTop: 0,
      minHeight: calc(vars.sizes.xs).toString(),
    },
    "&:first-child:before": {
      top: calc(vars.spacing.normal).add(vars.spacing.small).toString(),
    },
    "&:last-child": {
      paddingBottom: 0,
    },
    "&:last-child:before": {
      bottom: calc("100%")
        .subtract(vars.spacing.normal)
        .subtract(vars.spacing.small)
        .toString(),
    },
  },

  "@media": {
    [breakpoints.tablet]: {
      paddingLeft: calc(vars.sizes.small).add(vars.spacing.normal).toString(),
      paddingRight: 0,
      selectors: {
        "&:before": {
          left: calc(vars.sizes.small).divide(2).subtract("2px").toString(),
          width: 4,
        },
      },
    },
  },
});

export const timelineIconContainer = style({
  position: "absolute",
  left: 0,
  top: calc(vars.spacing.small).add(vars.spacing.small).toString(),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: vars.sizes.xs,
  width: vars.sizes.xs,
  backgroundColor: vars.colors.primary,
  borderRadius: vars.borderRadius,

  vars: {
    [iconColorVar]: vars.colors.white,
  },

  "@media": {
    [breakpoints.tablet]: {
      top: calc(vars.spacing.normal).add(vars.spacing.small).toString(),
      height: vars.sizes.small,
      width: vars.sizes.small,
    },
  },

  selectors: {
    [`${timelineItem}:first-child &`]: {
      top: vars.spacing.small,
    },
  },
});

export const timelineItemContent = style({});
