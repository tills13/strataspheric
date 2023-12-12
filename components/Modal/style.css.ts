import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const modalWrapper = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(3px)",
  zIndex: vars.zIndex.front,
});

export const modal = style({
  display: "grid",
  gridTemplateRows: "min-content auto",
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.white,
  width: "100vw",
  height: "100dvh",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      width: "600px",
      height: "unset",
      maxHeight: "80vh",
      border: border("2px", "solid", vars.colors.borderDefault),
      borderRadius: vars.borderRadius,
    },
  },
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.normal,
});

export const modalHeaderCloseIcon = style({
  height: vars.sizes.normal,
  cursor: "pointer",
});
