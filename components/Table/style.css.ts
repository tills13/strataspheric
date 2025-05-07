import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const table = style({
  display: "grid",
  gridTemplateColumns: "min-content auto min-content",
  columnGap: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      padding: padding(0, vars.spacing.normal),
    },
  },
});

export const tableRow = style({
  display: "grid",
  minHeight: vars.sizes.large,
  // padding: padding(vars.spacing.normal, vars.spacing.small),
  padding: padding(vars.spacing.small, vars.spacing.normal),
  textDecoration: "none",
  color: vars.fontColors.primary,
  position: "relative",

  gridColumn: "1/-1",
  gridTemplateColumns: "subgrid",
  alignItems: "center",

  "@media": {
    [breakpoints.tablet]: {
      // padding: padding(vars.spacing.small, vars.spacing.normal),
      borderRadius: vars.borderRadius,
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const tableRowCheckbox = style({
  "@media": {
    [breakpoints.tablet]: {
      visibility: "hidden",

      selectors: {
        [`${tableRow}:hover &, &:has(input[type=checkbox]:checked)`]: {
          visibility: "visible",
        },
      },
    },
  },
});

export const tableRowContent = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const tableRowEnd = style({});

export const tableRowActions = style({
  display: "none",

  position: "absolute",
  right: vars.spacing.xs,
  top: vars.spacing.small,
  bottom: vars.spacing.small,
  padding: vars.spacing.xxs,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey100,

  alignSelf: "center",

  "@media": {
    [breakpoints.desktop]: {
      selectors: {
        [`${tableRow}:hover &`]: {
          display: "block",
        },
      },
    },
  },
});
