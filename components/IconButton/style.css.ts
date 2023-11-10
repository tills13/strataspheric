import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";
import * as buttonProps from "../Button/style.css";

export const base = style([
  buttonProps.base,
  {
    padding: 0,
    textAlign: "center",
  },
]);

export const compact = style([
  base,
  {
    height: vars.sizes.small,
    width: vars.sizes.small,
    padding: 0,
  },
]);
