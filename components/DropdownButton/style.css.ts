import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { border } from "../../theme";

export const dropdownButton = style({
  position: "relative",
});

export const panelWrapper = style({
  position: "absolute",
  right: 0,

  border: border("2px", "solid", vars.colors.borderDefault),
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius,
  minWidth: 200,
  zIndex: vars.zIndex.modal,

  marginTop: 0,
  opacity: 0,

  transition: "opacity 0.25s ease, margin-top 0.25s ease",
});

export const panelWrapperUp = style([
  panelWrapper,
  {
    marginTop: "unset",
    marginBottom: vars.spacing.xs,
    bottom: "100%",
  },
]);

export const panelOpen = style({
  marginTop: vars.spacing.normal,
  opacity: 1,
});
