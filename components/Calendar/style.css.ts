import { breakpoints, vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const calendarEventTrackWidth = createVar();

// Event layout constants exposed as CSS vars so calc() can reference them
// in both the event top position and the overflow indicator top position.
// Height of one event pill (matches lineHeight: vars.sizes.xs = 24px)
export const calendarEventHeight = createVar();
// Gap between event pills
export const calendarEventGap = createVar();
// Top offset for the first event (clears the date badge: 32px)
export const calendarEventTopOffset = createVar();

export const calendar = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gridTemplateRows: "repeat(6, minmax(0, 1fr))",
  height: "100%",
  gap: vars.spacing.xs,
  userSelect: "none",
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
  vars: {
    [calendarEventHeight]: vars.sizes.xs, // 24px — matches lineHeight
    [calendarEventGap]: vars.spacing.xxs, // 2px
    [calendarEventTopOffset]: vars.sizes.small, // clears the date badge
  },
});

export const calendarDay = style({
  position: "relative",
  padding: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
  borderRadius: vars.borderRadius.md,
  border: `${vars.borderWidth} solid ${vars.colors.indigo100}`,
  backgroundColor: vars.colors.white,
  transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,

  "@media": {
    [breakpoints.desktop]: {
      // minHeight: vars.sizes.xxl2,
    },
  },
});

export const isDropTarget = style({
  backgroundColor: vars.colors.indigo50,
  borderColor: vars.colors.indigo400,
});

export const today = style([
  calendarDay,
  {
    backgroundColor: vars.colors.indigo50,
    borderColor: vars.colors.indigo200,
  },
]);

export const calendarDayOutOfScope = style([
  calendarDay,
  {
    opacity: vars.opacity.muted,
    backgroundColor: vars.colors.grey0,
    borderColor: vars.colors.grey200,
    cursor: "not-allowed",
  },
]);

export const calendarDate = style({
  position: "absolute",
  display: "inline-block",
  left: 0,
  top: 0,
  aspectRatio: "1/1",
  height: vars.sizes.xs,
  padding: vars.spacing.xs,
  textAlign: "center",
  fontSize: vars.fontSizes.normal,
  color: vars.colors.indigo700,
  backgroundColor: vars.colors.indigo50,
  borderTopLeftRadius: vars.borderRadius.md,
  borderBottomRightRadius: vars.borderRadius.md,
});

export const calendarDateToday = style({
  background: `linear-gradient(135deg, ${vars.colors.indigo500} 0%, ${vars.colors.primary} 100%)`,
  color: vars.colors.white,
  boxShadow: `0 1px 4px rgba(67, 56, 202, 0.3)`,
});

export const calendarEventTrackDay = style({
  position: "relative",
  cursor: "pointer",
  transition: `background-color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}`,
  borderRadius: vars.borderRadius.md,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.indigo50,
      boxShadow: `inset 0 0 0 1.5px ${vars.colors.indigo200}`,
    },
  },
});

export const calendarEvent = style({
  position: "absolute",
  left: 0,
  display: "block",
  padding: padding(0, vars.spacing.small),
  lineHeight: vars.sizes.xs,
  fontSize: vars.fontSizes.small,
  background: `linear-gradient(135deg, ${vars.colors.indigo600} 0%, ${vars.colors.primary} 100%)`,
  color: vars.colors.white,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  zIndex: 2,
  cursor: "pointer",
  boxShadow: `0 1px 3px rgba(67, 56, 202, 0.25)`,
  "@media": {
    [breakpoints.tablet]: {
      fontSize: vars.fontSizes.medium,
    },
  },

  selectors: {
    "&:hover": {
      background: `linear-gradient(135deg, ${vars.colors.indigo700} 0%, ${vars.colors.primaryHover} 100%)`,
      boxShadow: `0 2px 6px rgba(67, 56, 202, 0.35)`,
    },
    "&:not(:last-child)": {
      // Events are absolutely positioned; this rule is vestigial but harmless
      marginBottom: vars.spacing.small,
    },
  },
});

export const withLeftBorderRadius = style({
  borderTopLeftRadius: vars.borderRadius.sm,
  borderBottomLeftRadius: vars.borderRadius.sm,
});
export const withRightBorderRadius = style({
  borderTopRightRadius: vars.borderRadius.sm,
  borderBottomRightRadius: vars.borderRadius.sm,
});

export const calendarEventGhost = style({
  opacity: vars.opacity.muted,
  pointerEvents: "none",
});

export const calendarOverflow = style({
  position: "absolute",
  left: vars.spacing.xs,
  fontSize: vars.fontSizes.small,
  color: vars.colors.indigo500,
  fontWeight: vars.fontWeights.medium,
  pointerEvents: "none",
  whiteSpace: "nowrap",
});

export const calendarEventDragging = style({
  opacity: vars.opacity.disabled,
});

// Range selection styles — applied to calendarEventTrackDay
export const calendarDaySelected = style({
  backgroundColor: vars.colors.indigo100,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.indigo100,
      boxShadow: "none",
    },
  },
});

export const calendarDaySelectionStart = style({
  borderTopLeftRadius: vars.borderRadius.md,
  borderBottomLeftRadius: vars.borderRadius.md,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

export const calendarDaySelectionEnd = style({
  borderTopRightRadius: vars.borderRadius.md,
  borderBottomRightRadius: vars.borderRadius.md,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

export const calendarDaySelectionStartAndEnd = style({
  borderRadius: vars.borderRadius.md,
});
