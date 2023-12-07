import { vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../../../theme";

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

export const calendar = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)",
  width: "100vw",
  height: "100%",
});

export const calendarDay = style({
  padding: vars.spacing.small,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  overflow: "hidden",
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const today = style([
  calendarDay,
  {
    // border: "2px solid " + vars.colors.borderDefault,
  },
]);

export const calendarDayOutOfScope = style([
  calendarDay,
  {
    opacity: 0.5,
    backgroundColor: vars.colors.grey100,
    cursor: "not-allowed",
  },
]);

export const calendarDate = style({
  position: "relative",
  display: "inline-block",
  width: vars.sizes.small,
  height: vars.sizes.small,
  lineHeight: vars.sizes.small,
  textAlign: "center",
  // padding: vars.spacing.small,
  borderRadius: vars.borderRadius,
  marginBottom: vars.spacing.small,
  // backgroundColor: vars.colors.grey100,
  selectors: {
    [`${today} &`]: {
      backgroundColor: vars.colors.primary,
      color: vars.colors.white,
    },
  },
});

export const calendarEvent = style({
  display: "block",
  padding: padding(vars.spacing.xxs, vars.spacing.small),
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
  borderRadius: vars.borderRadius,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.small,
    },
  },
});
