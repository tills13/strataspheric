import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const dropdownButton = style({
  position: "relative",
});

export const panelWrapper = style({
  position: "absolute",
  right: 0,
  marginTop: vars.spacing.xs,
  border: border("2px", "solid", vars.colors.borderDefault),
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius,
  minWidth: 200,
  zIndex: vars.zIndex.modal,
});

export const panelWrapperUp = style([
  panelWrapper,
  {
    marginTop: "unset",
    marginBottom: vars.spacing.xs,
    bottom: "100%",
  },
]);
