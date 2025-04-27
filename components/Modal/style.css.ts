import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

const MODAL_GUTTER = "100px";

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

  "@media": {
    [breakpoints.tablet]: {
      width: "600px",
      height: "min-content",
      // height: "fit-content",
      // maxHeight: calc("100dvh")
      //   .subtract(calc(MODAL_GUTTER).multiply(2))
      //   .toString(),
      border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
      borderRadius: vars.borderRadius,
    },
  },
});

export const modalBodyContainer = style({
  // height: "100%",
  // overflow: "hidden",
});

export const modalBodyContainerInner = style({
  paddingTop: "6px",
  paddingBottom: vars.spacing.normal,
  // overflowY: "auto",
  // height: "100%",
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
