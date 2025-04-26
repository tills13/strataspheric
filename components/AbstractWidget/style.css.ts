import { vars } from "../../app/theme.css";
import * as eventWidgetStyles from "../EventWidget/style.css";
import * as fileWidgetStyles from "../FileWidget/style.css";
import { style } from "@vanilla-extract/css";

export const abstractWidget = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  height: "400px",
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

export const abstractWidgetListItem = style({});

export const abstractWidgetListItemContent = style({
  overflow: "hidden",
});
