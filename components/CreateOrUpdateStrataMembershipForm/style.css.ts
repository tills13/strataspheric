import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const permissionTable = style({});
export const permissionTableRow = style({
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius,
  selectors: {
    [`${permissionTable} &:nth-child(odd)`]: {
      backgroundColor: vars.colors.grey50,
    },
  },
});
