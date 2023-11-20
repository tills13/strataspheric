import { vars } from "../../app/theme.css";
import * as iconButtonStyles from "../IconButton/style.css";
import { style } from "@vanilla-extract/css";

export const icon = style({
  display: "inline",
  fill: vars.fontColors.primary,
  selectors: {
    [`${iconButtonStyles.base} &`]: {
      margin: "auto",
    },
  },
});
