import { vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const calendarPageContainer = style({
  display: "grid",
  height: "100%",
  gridTemplateRows: "min-content auto",
  gap: vars.spacing.normal,
});

export const strataCalendarContainer = style({
  height: "100%",
  background: `linear-gradient(180deg, ${vars.colors.indigo50} 0%, transparent 120px)`,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.small,
});
