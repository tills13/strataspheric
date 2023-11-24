import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const dropdownButton = style({
  position: "relative",
});

export const dropdownButtonIcon = style({});

export const dropdownPanelWrapper = style({
  position: "absolute",
  right: 0,
  marginTop: vars.spacing.xs,
  border: border("2px", "solid", vars.colors.borderDefault),
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius,
  minWidth: 200,
  zIndex: 1,
});
