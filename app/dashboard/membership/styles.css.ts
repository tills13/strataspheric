import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../theme.css";

export const pageTitle = style({
  marginBottom: vars.spacing.large,
});

export const membershipTable = style({
  width: "100%",
  // border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  gap: 0,
});

globalStyle(`${membershipTable} th, ${membershipTable} td`, {
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
});

globalStyle(`${membershipTable} th`, { textAlign: "left" });

export const membershipTableContainer = style({
  flex: 1,
});

export const membershipTableSection = style({
  selectors: {
    [`${membershipTable} &:not(:last-child)`]: {
      marginBottom: vars.spacing.large,
    },
  },
});

export const membershipTableSectionHeaderRow = style({
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
});

export const membershipTableActionColumnCell = style({
  textAlign: "right",
});

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
  },
});

export const addMemberForm = style({
  width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      width: "400px",
    },
  },
});
