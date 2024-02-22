import { vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const calendarPageContainer = style({
  display: "grid",
  height: "100%",
  gridTemplateRows: "min-content auto",
});

export const calendarPageHeader = style({
  display: "flex",
  justifyContent: "space-between",
  padding: vars.spacing.normal,
});

export const headerActions = style({
  display: "flex",
  gap: vars.spacing.large,
});
