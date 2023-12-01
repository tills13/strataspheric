import { vars } from "../../app/theme.css";
import * as fileAttachmentChipStyle from "../FileAttachmentChip/style.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const timelineItemContainer = style({
  position: "relative",
  padding: vars.spacing.normal,
  paddingLeft: vars.spacing.xl,
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

export const timelineEntry = style({
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
  marginBottom: vars.spacing.normal,
});

export const timelineEntryHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "top",
  marginBottom: vars.spacing.normal,
});

export const timelineEntryDate = style({
  fontSize: vars.fontSizes.small,
  color: vars.colors.grey400,
});

export const timelineAttachment = style([
  fileAttachmentChipStyle.file,
  {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
]);

export const timelineIcon = style({
  position: "absolute",
  left: 0,
  top: calc(vars.spacing.normal).add(vars.spacing.small).toString(),

  selectors: {
    [`${timelineItemContainer}:first-child &`]: {
      top: vars.spacing.small,
    },
  },
});
