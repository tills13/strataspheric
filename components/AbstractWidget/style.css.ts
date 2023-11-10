import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";
import * as fileWidgetStyles from "../FileWidget/style.css";
import * as eventWidgetStyles from "../EventWidget/style.css";

export const abstractWidget = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey200,
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
