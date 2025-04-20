import { breakpoints, iconColorVar, vars } from "../../app/theme.css";
import { timelineEntry } from "../StrataActivityTimeline/style.css";
import { style } from "@vanilla-extract/css";

export const invoiceChip = style({
  position: "relative",
  overflow: "hidden",

  selectors: {
    [`${timelineEntry} &`]: {
      backgroundColor: vars.colors.grey800,
      borderRadius: 0,
    },
  },
});

export const draftLabel = style({
  position: "absolute",
  display: "block",

  fontSize: vars.sizes.xl,
  fontWeight: vars.fontWeights.bold,
  opacity: 0.05,
  lineHeight: vars.sizes.xl,

  left: "50%",
  top: "50%",
  // transform: "translateX(-50%) rotate(-30deg)",
  transform: "translateX(-50%) translateY(-50%)",
});

export const invoiceBody = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const invoiceAmount = style({
  fontSize: vars.fontSizes.large,
});

export const invoiceHeaderStatus = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const invoiceStatusIcon = style({
  height: "24px",
  vars: {
    [iconColorVar]: vars.colors.green500,
  },
});
