import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../theme.css";
import { padding } from "../../../theme";

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

export const pageTitle = style({
  marginBottom: vars.spacing.large,
  padding: padding("0", vars.spacing.normal),
  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
    },
  },
});

export const pageSecondaryTitle = style([
  pageTitle,
  {
    marginBottom: vars.spacing.normal,
  },
]);

export const leftColumn = style({ flex: 1 });

export const membershipTableContainer = style({
  width: "100vw",
  overflow: "auto",
  marginBottom: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      width: "100%",
    },
  },
});

export const membershipTable = style({
  minWidth: "100%",
  // border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  gap: 0,
  borderSpacing: 0,
  "@media": {
    [breakpoints.tablet]: {
      width: "100%",
    },
  },
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

export const seatCountContainer = style({
  textAlign: "center",
  fontSize: vars.fontSizes.xxl,
  fontWeight: 400,
  "@media": {
    [breakpoints.desktop]: {
      textAlign: "left",
    },
  },
});
export const seatCountEmphasis = style({ fontWeight: 700 });

export const addMemberForm = style({
  padding: padding("0px", vars.spacing.normal),
  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
      width: "400px",
    },
  },
});
