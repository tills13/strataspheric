import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "./theme.css";

export const body = style({
  height: "100vh",
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
});
