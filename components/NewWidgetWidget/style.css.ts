import { vars } from "../../app/theme.css";
import { icon } from "../Icon/style.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../theme";

export const addWidgetWidget = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  height: vars.sizes.xxl4,
  transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
      borderRadius: vars.borderRadius.lg,
      border: border(vars.borderWidth, "solid", vars.colors.borderDefault),
    },
  },
});

export const addWidgetWidgetContainer = style({
  width: vars.sizes.xxl2,
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
