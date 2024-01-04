import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const timeline = style({});

export const timelineItem = style({
  position: "relative",
  padding: vars.spacing.normal,
  paddingLeft: calc(vars.sizes.small).add(vars.spacing.normal).toString(),
  paddingRight: 0,

  selectors: {
    "&:before": {
      position: "absolute",
      content: " ",
      left: calc(vars.sizes.small).divide(2).subtract("2px").toString(),
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: vars.colors.primary,
    },
    "&:first-child": {
      paddingTop: 0,
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
});

export const timelineIconContainer = style({
  position: "absolute",
  left: 0,
  top: calc(vars.spacing.normal).add(vars.spacing.small).toString(),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: vars.sizes.small,
  width: vars.sizes.small,
  backgroundColor: vars.colors.primary,
  borderRadius: "50%",

  selectors: {
    [`${timelineItem}:first-child &`]: {
      top: vars.spacing.small,
    },
  },
});

export const timelineItemContent = style({});
