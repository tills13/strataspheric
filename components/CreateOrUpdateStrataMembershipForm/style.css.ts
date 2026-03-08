import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const stickySubmit = style({
  position: "sticky",
  bottom: vars.spacing.normal,

  transition: `box-shadow ${vars.transitions.normal}`,
  backgroundColor: "transparent",
});

export const stickySubmitStuck = style({
  borderRadius: vars.borderRadius.md,
  boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.20)",
});

export const permissionTable = style({});
export const permissionTableRow = style({
  padding: vars.spacing.normal,
  borderRadius: vars.borderRadius.md,
  selectors: {
    [`${permissionTable} &:nth-child(odd)`]: {
      backgroundColor: vars.colors.grey50,
    },
  },
});
