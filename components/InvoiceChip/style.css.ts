import { vars } from "../../app/theme.css";
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

  transform: "translateX(-50%) translateY(-50%)",
});
