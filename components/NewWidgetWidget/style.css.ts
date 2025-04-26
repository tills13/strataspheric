import { vars } from "../../app/theme.css";
import { icon } from "../Icon/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const addWidgetWidget = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  height: "400px",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
      borderRadius: vars.borderRadius,
      border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
    },
  },
});

export const addWidgetWidgetContainer = style({
  width: 100,
  textAlign: "center",
  fontSize: vars.fontSizes.normal,
});

export const addWidgetWidgetIcon = style([
  icon,
  {
    display: "block",
    margin: "auto",
    height: vars.sizes.xl,
  },
]);
