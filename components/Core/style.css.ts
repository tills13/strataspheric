import { breakpoints } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { important, invertBreakpoint } from "../../theme";

export const core = style({});

export const coreVisibleFrom = styleVariants({
  mobile: {
    "@media": {
      [invertBreakpoint(breakpoints.mobile)]: { display: "none" },
    },
  },
  mobilePlus: {
    "@media": {
      [invertBreakpoint(breakpoints.mobilePlus)]: { display: "none" },
    },
  },

  tablet: {
    "@media": { [invertBreakpoint(breakpoints.tablet)]: { display: "none" } },
  },

  tabletPlus: {
    "@media": {
      [invertBreakpoint(breakpoints.tabletPlus)]: { display: "none" },
    },
  },

  desktop: {
    "@media": { [invertBreakpoint(breakpoints.desktop)]: { display: "none" } },
  },
});

export const coreVisibleOn = styleVariants({
  mobile: {
    "@media": {
      [breakpoints.mobilePlus]: {
        display: important("none"),
      },
    },
  },
});
