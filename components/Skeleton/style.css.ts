import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const widgetSkeleton = style({});

export const skeletonBone = style({
  display: "block",
  height: "1em",
  width: "100%",
  backgroundColor: vars.colors.borderDefault,
  borderRadius: vars.borderRadius,

  selectors: {
    [`${widgetSkeleton} &:not(:last-child)`]: {
      marginBottom: vars.spacing.small,
    },
  },
});

export const inlineSkeletonBone = style([
  skeletonBone,
  {
    display: "inline-block",
    verticalAlign: "baseline",
  },
]);

export const skeletonHeader = style({
  marginBottom: vars.spacing.normal,
});

export const skeletonBoneHeader = style([
  skeletonBone,
  {
    selectors: {
      [`${widgetSkeleton} &:not(:last-child)`]: {
        marginBottom: vars.spacing.normal,
      },
    },
  },
]);
