import { breakpoints, sidebarWidthVar } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const body = style({
  // display: "grid",
  // gridTemplateRows: "min-content auto",
  // gridTemplateColumns: "100vw",
  // minHeight: "100vh",
  // overflow: "hidden",
  // background: `linear-gradient(135deg, color-mix(in srgb, ${vars.colors.blue500} 0%, transparent), color-mix(in srgb, ${vars.colors.blue500} 10%, transparent) 75%)`,

  "@media": {
    [breakpoints.tablet]: {
      vars: {
        [sidebarWidthVar]: "250px",
      },
    },
  },

  vars: {
    [sidebarWidthVar]: "0px",
  },
});

export const errorBody = style({
  minHeight: "100vh",
});
