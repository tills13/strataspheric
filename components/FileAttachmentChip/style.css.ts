import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const fileAttachmentChip = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: vars.spacing.small,
  backgroundColor: vars.colors.grey50,
  border: border("2px", "solid", vars.colors.grey50),
  height: vars.sizes.normal,
  color: "inherit",
  borderRadius: vars.borderRadius,
});

export const icon = style({
  height: "24px",
  verticalAlign: "top",
  flexShrink: 0,
});

export const name = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
