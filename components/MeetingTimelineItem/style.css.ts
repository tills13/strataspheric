import { vars } from "../../app/theme.css";
import * as fileAttachmentChipStyle from "../FileAttachmentChip/style.css";
import { iconColorVar } from "../Icon/style.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

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
    vars: {
      [iconColorVar]: vars.colors.white,
    },
  },
]);
