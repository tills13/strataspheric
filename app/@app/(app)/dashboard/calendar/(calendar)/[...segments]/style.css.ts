import { vars } from "../../../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../../../../theme";

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
  padding: 0,
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

export const today = style([calendarDay, {}]);

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
  marginTop: vars.spacing.xs,
  marginLeft: vars.spacing.xs,
  padding: vars.spacing.small,
  textAlign: "center",
  borderRadius: vars.borderRadius,
  marginBottom: vars.spacing.small,
  selectors: {
    [`${today} &`]: {
      marginTop: vars.spacing.small,
      padding: `${vars.spacing.xs} ${vars.spacing.small}`,
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

export const withLeftMargin = style({
  borderTopLeftRadius: vars.borderRadius,
  borderBottomLeftRadius: vars.borderRadius,
  marginLeft: vars.spacing.small,
});
export const withRightMargin = style({
  borderTopRightRadius: vars.borderRadius,
  borderBottomRightRadius: vars.borderRadius,
  marginRight: vars.spacing.small,
});
