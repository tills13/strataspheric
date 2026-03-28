import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const getStartedForm = style({
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      maxWidth: vars.containerWidth.lg,
    },
  },
});
