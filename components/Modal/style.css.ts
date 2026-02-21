import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

const MODAL_GUTTER = vars.spacing.xl;

export const modalWrapper = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  backdropFilter: "blur(5px)",
  zIndex: vars.zIndex.modal,
  overflowY: "auto",

  "@media": {
    [breakpoints.tablet]: {
      paddingTop: MODAL_GUTTER,
      paddingBottom: MODAL_GUTTER,
    },
  },
});

export const modal = style({
  padding: padding(0, vars.spacing.normal),
  backgroundColor: vars.colors.white,
  width: "100vw",
  height: "100dvh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      display: "block",
      width: "600px",
      height: "min-content",
      border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
      borderRadius: vars.borderRadius.lg,
      boxShadow: vars.shadows.xl,
    },
  },
});

export const modalBodyContainer = style({});

export const modalBodyContainerInner = style({
  paddingTop: vars.spacing["6"],
  paddingBottom: vars.spacing.normal,
});

export const modalHeader = style({
  overflow: "hidden",
});

export const modalHeaderTitleContainer = style({
  overflow: "hidden",
});

export const modalHeaderTitle = style({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
