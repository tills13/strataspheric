import { breakpoints, iconColorVar, vars } from "../../app/theme.css";
import { timelineAttachment } from "../MeetingTimelineItem/style.css";
import { style } from "@vanilla-extract/css";

export const invoiceChip = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey50,
  borderRadius: vars.borderRadius,

  selectors: {
    [`${timelineAttachment}&`]: {
      backgroundColor: vars.colors.grey800,
      borderRadius: 0,
    },
  },
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

export const markPaidButton = style({
  // flex: 1,
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
