import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../theme.css";
import { padding } from "../../../theme";

export const pageTitle = style({
  marginBottom: vars.spacing.large,
  padding: padding("0", vars.spacing.normal),
  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
    },
  },
});

export const membershipTableContainer = style({
  width: "100vw",
  // marginLeft: `calc(-1 * ${vars.spacing.normal})`,
  overflow: "auto",
});

export const membershipTable = style({
  // width: "100%",
  // border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  gap: 0,
  borderSpacing: 0,
});

globalStyle(`${membershipTable} th, ${membershipTable} td`, {
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  whiteSpace: "nowrap",
});

globalStyle(`${membershipTable} th`, { textAlign: "left" });

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
  // width: "100%",
  "@media": {
    [breakpoints.tablet]: {
      width: "400px",
    },
  },
});
