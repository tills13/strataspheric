import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const upsellContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,

  "@media": {
    [breakpoints.tablet]: {
      margin: "auto",
      maxWidth: "500px",
      height: "100%",
    },
  },
});

export const upsell = style({
  maxWidth: vars.containerWidth.md,
  textAlign: "center",
  padding: vars.spacing["40"],
});
