import { vars } from "../../app/theme.css";
import * as buttonProps from "../Button/style.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const base = style([
  buttonProps.base,
  {
    padding: padding("8px", "0"),
    height: vars.sizes.normal,
    width: vars.sizes.normal,
    textAlign: "center",
  },
]);

export const compact = style([
  base,
  {
    height: vars.sizes.small,
    width: vars.sizes.small,
    padding: padding("4px", "0"),
  },
]);
