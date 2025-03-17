import { vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const calendarPageContainer = style({
  display: "grid",
  height: "100%",
  gridTemplateRows: "min-content auto",
});

export const strataCalendarContainer = style({
  padding: `0 ${vars.spacing.normal} ${vars.spacing.normal}`,
});
