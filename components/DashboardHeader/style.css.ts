import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const subheader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100vw",
  gap: vars.spacing.normal,
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  borderBottom: `1px solid ${vars.colors.grey100}`,
});

export const linksRail = style({
  display: "flex",
  gap: vars.spacing.small,
  flex: 1,
  overflow: "auto",
});

export const subheaderLink = style({
  padding: `${vars.spacing.xs} ${vars.spacing.small}`,
  whiteSpace: "nowrap",
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
