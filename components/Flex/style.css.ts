import { breakpoints } from "../../app/theme.css";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
  flexDirection: "column",
});

export const flexBreakpoint = styleVariants(
  Object.fromEntries(
    Object.keys(breakpoints).map((breakpoint) => [
      breakpoint,
      {
        "@media": {
          [breakpoints[breakpoint as keyof typeof breakpoints]]: {
            flexDirection: "row",
          },
        },
      },
    ]),
  ) as Record<keyof typeof breakpoints, ComplexStyleRule>,
);

export const flexElement = style({
  // flex: 1,
});
