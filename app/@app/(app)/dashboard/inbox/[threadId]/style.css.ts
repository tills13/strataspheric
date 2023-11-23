import { breakpoints } from "../../../../../theme.css";
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
