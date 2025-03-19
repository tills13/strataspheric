import { style } from "@vanilla-extract/css";

export const link = style({});
export const noUnderline = style([link, { textDecoration: "none" }]);
