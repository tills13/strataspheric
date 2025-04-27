import { iconColorVar, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const minutesApproverIcon = style({
  height: vars.sizes.xs,
  vars: {
    [iconColorVar]: vars.colors.green500,
  },
});
