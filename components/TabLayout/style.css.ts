import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const tabLayout = style({});

export const tabsContainer = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: vars.spacing.xl,
});

export const tabs = style({
  display: "inline-flex",
  flexDirection: "row",
  gap: vars.spacing.normal,
  margin: "auto",
  padding: vars.spacing.xs,

  //   borderRadius: calc(vars.sizes.normal).divide(2).toString(),
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey100,
});

export const tabsTab = style({
  paddingLeft: vars.spacing.normal,
  paddingRight: vars.spacing.normal,
  lineHeight: vars.sizes.normal,
  //   borderRadius: calc(vars.sizes.normal).divide(2).toString(),
  borderRadius: vars.borderRadius,

  cursor: "pointer",
});

export const activeTabsTab = style([
  tabsTab,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
  },
]);

export const tabContainer = style({
  position: "relative",
});

export const tab = style({
  position: "absolute",
  top: 0,
  left: calc(vars.spacing.normal).negate().toString(),
  opacity: 0,
  pointerEvents: "none",

  transition: "left 0.25s ease, opacity 0.25s ease",
});

export const activeTab = style([
  tab,
  {
    position: "relative",
    left: 0,
    opacity: 1,
    pointerEvents: "all",
  },
]);
