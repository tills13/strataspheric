import { breakpoints } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { important } from "../../theme";

export const core = style({});

export const coreVisibleFrom = styleVariants({
  mobile: {
    visibility: "hidden",

    "@media": {
      [breakpoints.mobile]: {
        visibility: "visible",
      },
    },
  },
});

export const coreVisibleOn = styleVariants({
  mobile: {
    "@media": {
      [breakpoints.mobilePlus]: {
        // visibility: "hidden",
        display: important("none"),
      },
    },
  },
});
