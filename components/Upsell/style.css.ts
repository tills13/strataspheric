import { breakpoints } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const upsellContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const upsell = style({
  "@media": {
    [breakpoints.tablet]: {
      marginTop: "-50%",
      maxWidth: "75%",
    },
  },
});
