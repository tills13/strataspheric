import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const addWidgetWidget = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
      borderRadius: vars.borderRadius,
      border: border("2px", "solid", vars.colors.borderDefault),
    },
  },
});

export const addWidgetWidgetContainer = style({
  width: 100,
  textAlign: "center",
  fontSize: vars.fontSizes.normal,
  color: vars.colors.grey500,
});

export const addWidgetWidgetIcon = style({
  height: vars.sizes.xl,
});
