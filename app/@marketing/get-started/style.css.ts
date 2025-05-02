import { breakpoints } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const getStartedForm = style({
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      maxWidth: calc("100vw").subtract(calc("300px").multiply(2)).toString(),
    },
  },
});
