import { breakpoints, vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const threadPageContainer = style({
  overflow: "hidden",
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
    },
  },
});

export const chatPanelWrapper = style({
  // padding: vars.spacing.normal,
  borderLeft: "1px solid " + vars.colors.borderDefault,
  minHeight: "100%",
  overflow: "hidden",
});
