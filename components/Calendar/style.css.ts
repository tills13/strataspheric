import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

export const calendar = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gridTemplateRows: "repeat(6, minmax(0, 1fr))",
  width: "100vw",
  height: "100%",
  gap: vars.spacing.xs,
});

export const calendarRow = style({
  position: "relative",
  display: "grid",
  gridColumn: "1/-1",
  gridTemplateColumns: "subgrid",
});

export const calendarWeek = style({
  display: "grid",
  gridTemplateColumns: "subgrid",
  height: "100%",
  gridRow: "1/1",
  gridColumn: "1/-1",
  zIndex: 1,
});

export const calendarEventTrack = style({
  position: "relative",
  zIndex: 2,
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridRow: "1/1",
  gridColumn: "1/-1",
  marginTop: "40px",
  pointerEvents: "none",
});

export const calendarDay = style({
  position: "relative",
  padding: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  zIndex: 1,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.blue50,
  // border: `1px solid ${vars.colors.borderDefault}`,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey50,
    },
  },
});

export const isDropTarget = style({
  backgroundColor: vars.colors.grey100,
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
  aspectRatio: "1/1",
  padding: vars.spacing.xs,
  textAlign: "center",
  fontSize: vars.fontSizes.normal,
  backgroundColor: vars.colors.grey100,
  borderTopLeftRadius: vars.borderRadius,
  borderBottomRightRadius: vars.borderRadius,
  selectors: {
    [`${today} &`]: {
      backgroundColor: vars.colors.primary,
      color: vars.colors.white,
    },
  },
});

export const calendarEventTrackDay = style({
  position: "relative",
});

export const calendarEvent = style({
  position: "absolute",
  left: 0,
  display: "block",
  padding: padding(0, vars.spacing.small),
  lineHeight: vars.sizes.xs,
  fontSize: vars.fontSizes.small,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  zIndex: 2,
  cursor: "pointer",
  "@media": {
    [breakpoints.tablet]: {
      fontSize: vars.fontSizes.normal,
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.primaryHover,
    },
    "&:not(:last-child)": {
      marginBottom: vars.spacing.small,
    },
  },
});

export const withLeftBorderRadius = style({
  borderTopLeftRadius: vars.borderRadius,
  borderBottomLeftRadius: vars.borderRadius,
});
export const withRightBorderRadius = style({
  borderTopRightRadius: vars.borderRadius,
  borderBottomRightRadius: vars.borderRadius,
});
