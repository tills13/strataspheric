import { vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../../theme";

export const submitButtonIcon = style({
  fill: important(vars.colors.green500),
  height: vars.sizes.small,
});
