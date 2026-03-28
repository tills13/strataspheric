import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  margin: `${vars.spacing["48"]} auto 0`,
  width: "100%",
  maxWidth: vars.containerWidth.sm,
  padding: `0 ${vars.spacing.normal} ${vars.spacing["48"]}`,
  overflow: "auto",

  "@media": {
    [breakpoints.tablet]: {
      margin: `${vars.spacing.xl} auto 0`,
    },
  },
});
