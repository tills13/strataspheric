import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const plansContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  justifyContent: "center",
  gap: vars.spacing["24"],
  maxWidth: "340px",
  margin: "0 auto",
  paddingTop: vars.spacing.large,

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      maxWidth: vars.containerWidth.lg,
      gap: vars.spacing.large,
    },
  },
});
