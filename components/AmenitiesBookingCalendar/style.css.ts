import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const headerActionsPrev = style({
  transform: "rotate(180deg)",
});

export const container = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gridTemplateRows: "repeat(3, 75px)",
  gap: vars.spacing.xs,
});
