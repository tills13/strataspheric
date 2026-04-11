import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const tabLayout = style({});

export const tabsContainer = style({
  display: "flex",
  justifyContent: "center",

  "@media": {
    [breakpoints.tablet]: {
      marginBottom: vars.spacing.xl,
    },
  },
});

export const tabs = style({
  display: "inline-flex",
  flexDirection: "row",
  gap: vars.spacing.xxs,
  margin: "auto",
  padding: vars.spacing.xxs,

  borderRadius: vars.borderRadius.lg,
  background: "rgba(245, 245, 246, 0.6)",
  backdropFilter: "blur(12px) saturate(1.2)",
  WebkitBackdropFilter: "blur(12px) saturate(1.2)",
  border: `1px solid rgba(255, 255, 255, 0.5)`,
  boxShadow: [
    "0 2px 8px -2px rgba(67, 56, 202, 0.06)",
    "0 1px 2px rgba(0, 0, 0, 0.02)",
    "inset 0 1px 0 rgba(255, 255, 255, 0.5)",
  ].join(", "),
});

export const tabsTab = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: vars.spacing["20"],
  paddingRight: vars.spacing["20"],
  paddingTop: vars.spacing.small,
  paddingBottom: vars.spacing.small,
  lineHeight: vars.lineHeights.tight,
  borderRadius: vars.borderRadius.md,
  cursor: "pointer",
  transition: `background-color ${vars.transitions.fast}, color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}`,
  userSelect: "none",

  ":hover": {
    backgroundColor: vars.colors.grey100,
  },
});

export const tabsTabLabel = style({
  fontSize: vars.fontSizes.normal,
  fontWeight: vars.fontWeights.medium,
  letterSpacing: vars.letterSpacing.normal,
  whiteSpace: "nowrap",
});

export const tabsTabDescription = style({
  fontSize: vars.fontSizes.xs,
  color: vars.fontColors.tertiary,
  whiteSpace: "nowrap",
  marginTop: "1px",
  transition: `color ${vars.transitions.fast}`,
});

export const activeTabsTab = style([
  tabsTab,
  {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: [
      vars.shadows.sm,
      "0 0 8px -2px rgba(67, 56, 202, 0.08)",
      "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
    ].join(", "),
    cursor: "default",

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
  },
]);

export const activeTabsTabLabel = style([
  tabsTabLabel,
  {
    color: vars.colors.primary,
    fontWeight: vars.fontWeights.bold,
  },
]);

export const activeTabsTabDescription = style([
  tabsTabDescription,
  {
    color: vars.fontColors.secondary,
  },
]);

export const tabContainer = style({
  position: "relative",
  display: "grid",
  gridTemplateAreas: '"stack"',
  overflowClipMargin: "32px",
  overflow: "clip",
});

export const tab = style({
  position: "relative",
  gridArea: "stack",
  left: calc(vars.spacing.normal).negate().toString(),
  opacity: 0,
  height: 0,
  pointerEvents: "none",

  transition: `left ${vars.transitions.normal}, opacity ${vars.transitions.normal}`,
});

export const activeTab = style([
  tab,
  {
    position: "relative",
    left: 0,
    opacity: 1,
    height: "auto",
    pointerEvents: "all",
  },
]);
