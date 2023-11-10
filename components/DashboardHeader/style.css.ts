import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const subheader = style({
  display: "flex",
  gap: vars.spacing.small,
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  borderBottom: `1px solid ${vars.colors.grey100}`,
});

export const subheaderLink = style({
  padding: `${vars.spacing.xs} ${vars.spacing.small}`,
});

export const activeSubheaderLink = style([
  subheaderLink,
  {
    background: vars.colors.grey700,
    color: `${vars.colors.white} !important`,
    borderRadius: vars.borderRadius,
    textDecoration: "none",

    selectors: {
      "&& &:active": {
        color: `${vars.colors.white} !important`,
      },
      "&& &:visited": {
        color: `${vars.colors.white} !important`,
      },
    },
  },
]);
