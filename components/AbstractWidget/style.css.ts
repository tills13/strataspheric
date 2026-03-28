import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const abstractWidget = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius.lg,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  boxShadow: vars.shadows.sm,
  aspectRatio: "1 / 1",
});

export const abstractWidgetHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.spacing.normal,
});

export const abstractWidgetBody = style({
  flex: 1,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const abstractWidgetList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
  flex: 1,
  overflowY: "auto",
});

export const abstractWidgetPagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: vars.spacing.small,
  marginTop: "auto",
});

export const abstractWidgetListItem = style({});

export const abstractWidgetListItemContent = style({
  overflow: "hidden",
});
