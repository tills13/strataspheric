import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../theme";

export const calendar = style({
  display: "grid",
  gridTemplateRows: "repeat(6, minmax(0, 1fr))",
  width: "100vw",
  height: "100%",
});

export const calendarRow = style({
  position: "relative",
});

export const calendarWeek = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  height: "100%",
  zIndex: 1,
});

export const calendarEventTrack = style({
  position: "relative",
  zIndex: 2,
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  marginTop: "40px",
});

export const calendarDay = style({
  position: "relative",
  padding: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  zIndex: 1,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
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
