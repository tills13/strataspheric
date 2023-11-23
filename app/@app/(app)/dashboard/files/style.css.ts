import { breakpoints, vars } from "../../../../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../../../../theme";

export const filesTable = style({});

export const filesTableRow = style({
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const filesTableCell = style({
  padding: padding(vars.spacing.small, vars.spacing.normal),
  whiteSpace: "nowrap",
});
