import { iconColorVar, vars } from "../../app/theme.css";
import * as fileAttachmentChipStyle from "../FileAttachmentChip/style.css";
import { style } from "@vanilla-extract/css";

export const timelineEntry = style({
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
});

export const timelineEntryHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "top",
  padding: vars.spacing.normal,
});

export const timelineEntryMessage = style({
  padding: vars.spacing.normal,
  whiteSpace: "pre-line",
});

export const timelineEntryDate = style({
  fontSize: vars.fontSizes.small,
  color: vars.colors.grey400,
});

export const timelineAttachment = style([
  fileAttachmentChipStyle.file,
  {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    vars: {
      [iconColorVar]: vars.colors.white,
    },
  },
]);
