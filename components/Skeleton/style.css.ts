import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const skeleton = style({});

export const skeletonBone = style({
  display: "block",
  height: "1em",
  width: "100%",
  backgroundColor: vars.colors.borderDefault,
  borderRadius: vars.borderRadius,

  selectors: {
    [`${skeleton} &:not(:last-child)`]: {
      marginBottom: vars.spacing.small,
    },
  },
});

export const skeletonHeader = style({
  marginBottom: vars.spacing.normal,
});

export const skeletonBoneHeader = style([
  skeletonBone,
  {
    selectors: {
      [`${skeleton} &:not(:last-child)`]: {
        marginBottom: vars.spacing.normal,
      },
    },
  },
]);
