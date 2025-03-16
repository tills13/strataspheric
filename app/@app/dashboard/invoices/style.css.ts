import { dividerText } from "../../../../components/DividerText/style.css";
import { money } from "../../../../components/Money/style.css";
import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  padding: vars.spacing.normal,
});

export const invoicesContainer = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100%",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateRows: "unset",
      gridTemplateColumns: "450px auto",
    },
  },
});

export const invoicesList = style({
  maxWidth: "100%",
  borderSpacing: 0,
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

export const totalRevenueTitleDivider = style([
  dividerText,
  {
    fontSize: vars.fontSizes.large,
  },
]);

export const totalRevenueMoneyContainer = style({
  textAlign: "end",
});

export const totalRevenueMoney = style([
  money,
  {
    fontSize: vars.fontSizes.large,
  },
]);
