import { vars } from "../../app/theme.css";
import * as eventWidgetStyles from "../EventWidget/style.css";
import * as fileWidgetStyles from "../FileWidget/style.css";
import { style } from "@vanilla-extract/css";

export const abstractWidget = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius,
  border: `2px solid ${vars.colors.borderDefault}`,
  // overflow: "hidden",
});

export const abstractWidgetHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.spacing.normal,
});

export const abstractWidgetBody = style({
  flex: 1,
  selectors: {
    [`${fileWidgetStyles.fileWidget} &`]: {
      display: "flex",
      flexDirection: "column",
    },

    [`${eventWidgetStyles.eventWidget} &`]: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

export const abstractWidgetList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  flex: 1,
  marginBottom: vars.spacing.normal,
});

export const abstractWidgetListItem = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  selectors: {
    [`${abstractWidgetList} &:not(:last-child)`]: {
      paddingBottom: vars.spacing.normal,
      borderBottom: `1px solid ${vars.colors.borderDefault}`,
    },
  },
});

export const abstractWidgetListItemContent = style({
  overflow: "hidden",
});
