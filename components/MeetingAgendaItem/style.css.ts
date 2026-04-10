import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

const checkIn = keyframes({
  "0%": { transform: "scale(0.8)", opacity: "0" },
  "50%": { transform: "scale(1.1)" },
  "100%": { transform: "scale(1)", opacity: "1" },
});

export const agendaItemWrapper = style({
  display: "flex",
  gap: vars.spacing.normal,
  position: "relative",
});

export const agendaItemWrapperDone = style([agendaItemWrapper, {}]);

export const ordinalColumn = style({
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  paddingTop: 2,
  width: 48,

  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
    },
  },
});

export const ordinalNumber = style({
  width: 48,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontVariantNumeric: "tabular-nums",
  fontSize: vars.fontSizes.larger,
  fontWeight: vars.fontWeights.bold,
  letterSpacing: vars.letterSpacing.tight,
  color: vars.colors.indigo700,
  backgroundColor: vars.colors.indigo50,
  borderRadius: vars.borderRadius.lg,
  border: `${vars.borderWidth} solid ${vars.colors.indigo100}`,
  transition: vars.transitions.normal,
  position: "relative",
  zIndex: 1,
});

export const ordinalNumberDone = style([
  ordinalNumber,
  {
    color: vars.colors.green700,
    backgroundColor: vars.colors.green100,
    borderColor: vars.colors.green300,
  },
]);

export const ordinalCheckmark = style({
  position: "absolute",
  bottom: -3,
  right: -3,
  width: 18,
  height: 18,
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.green500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${checkIn} 300ms ease`,
  boxShadow: `0 0 0 2px ${vars.colors.white}`,
});

export const trackLine = style({
  flex: 1,
  width: 2,
  marginTop: vars.spacing.small,
  marginBottom: `calc(-1 * ${vars.spacing.normal})`,
  backgroundColor: vars.colors.grey200,
  transition: vars.transitions.normal,
});

export const trackLineDone = style([
  trackLine,
  {
    backgroundColor: vars.colors.green300,
  },
]);

export const agendaItemContent = style({
  flex: 1,
  minWidth: 0,
});

export const agendaItem = style({
  position: "relative",
});

export const agendaItemDone = style([
  agendaItem,
  { opacity: vars.opacity.muted },
]);

export const agendaItemCheckboxPendingIcon = style({
  height: vars.sizes.xs,
});

export const headerHeader = style({
  flex: 1,
  lineHeight: vars.sizes.xs,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const agendaItemDescription = style({
  whiteSpace: "pre-line",
});

export const voteRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing.small,
});

export const voteAttendeeName = style({
  minWidth: "120px",
});
