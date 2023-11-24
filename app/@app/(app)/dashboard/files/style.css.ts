import { breakpoints, vars } from "../../../../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../../theme";

export const filesTableContainer = style({
  width: "100vw",
  overflow: "auto",
  marginBottom: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      width: "100%",
    },
  },
});

export const filesTable = style({
  minWidth: "100%",
  borderSpacing: 0,
});

export const filesTableRow = style({
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const filesTableCell = style({
  padding: padding(vars.spacing.small, vars.spacing.normal),
  textAlign: "left",
  whiteSpace: "nowrap",
});

export const descriptionCell = style([
  filesTableCell,
  {
    width: "100%",
  },
]);
