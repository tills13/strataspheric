import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { border, padding } from "../../theme";

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
  padding: padding(0, vars.spacing.normal),
  backgroundColor: vars.colors.white,
  width: "100vw",
  height: "100dvh",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      width: "600px",
      // height: "unset",
      maxHeight: "80vh",
      border: border("2px", "solid", vars.colors.borderDefault),
      borderRadius: vars.borderRadius,
    },
  },
});

export const modalBodyContainer = style({
  display: "grid",
  gridTemplateRows: "min-content 1fr",
  gridTemplateColumns: "100%",
  height: "100%",
  overflow: "hidden",
});

export const modalBodyContainerInner = style({
  paddingBottom: vars.spacing.normal,
  overflowY: "auto",
  height: "100%",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.normal,
  overflow: "hidden",
  paddingTop: vars.spacing.normal,
});

export const modalHeaderTitleContainer = style({
  overflow: "hidden",
});

export const modalHeaderTitle = style({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
