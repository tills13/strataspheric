import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../theme";

export const pageContainer = style({
  padding: vars.spacing.normal,
});

export const invoicesContainer = style({
  display: "grid",
  gridTemplateColumns: "min-content min-content auto min-content",
  columnGap: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      padding: padding(0, vars.spacing.normal),
    },
  },
});

export const invoiceListItem = style({
  display: "grid",
  padding: padding(vars.spacing.small, vars.spacing.normal),
  minHeight: vars.sizes.large,
  textDecoration: "none",
  color: vars.fontColors.primary,
  position: "relative",

  gridColumn: "1/-1",
  gridTemplateColumns: "subgrid",
  alignItems: "center",

  "@media": {
    [breakpoints.tablet]: {
      borderRadius: vars.borderRadius,
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const invoicesSidePanel = style({
  gridRow: 1,

  "@media": {
    [breakpoints.tablet]: {
      gridRow: "unset",
    },
  },
});

export const invoicesListInvoiceContainer = style({
  display: "block",
  textDecoration: "none",
  color: "inherit",

  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.normal,
    },
  },
});
