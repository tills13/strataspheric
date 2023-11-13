import { style } from "@vanilla-extract/css";
import * as iconButtonStyles from "../IconButton/style.css";
import { vars } from "../../app/theme.css";

export const icon = style({
  display: "inline",
  fill: vars.fontColors.primary,
  selectors: {
    [`${iconButtonStyles.base} &`]: {
      margin: "auto",
    },
  },
});
