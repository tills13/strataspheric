import { breakpoints, media, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const table = style({
  display: "grid",
  gridTemplateColumns: "auto min-content",
  columnGap: vars.spacing.normal,
  rowGap: vars.spacing.xs,
});

export const tableWithSelect = style({
  display: "grid",
  gridTemplateColumns: "min-content auto min-content",
  columnGap: vars.spacing.normal,
  rowGap: vars.spacing.xs,
});

export const tableRow = style({
  display: "grid",
  gridColumn: "1/-1",
  gridTemplateColumns: "subgrid",

  minHeight: vars.sizes.large,
  borderRadius: vars.borderRadius,
  textDecoration: "none",

  position: "relative",

  "@media": {
    [breakpoints.tablet]: {},
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
    "&:nth-child(odd)": {
      backgroundColor: vars.colors.grey50,
    },
    "&:nth-child(odd):hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const tableRowInner = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "1/-1",
  alignItems: "center",

  selectors: {
    [`${tableWithSelect} &`]: {
      paddingLeft: vars.spacing.normal,
    },
  },
});

export const tableRowInnerInner = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "subgrid",
  alignItems: "center",
  height: "100%",
  color: "inherit",

  selectors: {
    [`${table} &`]: {
      gridColumn: "1/-1",
      padding: padding(vars.spacing["0"], vars.spacing.normal),
    },
    [`${tableWithSelect} &`]: {
      paddingRight: vars.spacing.normal,
      gridColumn: "2/-1",
    },
  },
});

export const tableRowCheckbox = style({
  "@media": {
    [breakpoints.tablet]: {
      // visibility: "hidden",

      selectors: {
        [`${tableRow}:hover &, &:has(input[type=checkbox]:checked)`]: {
          // visibility: "visible",
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
    [media.pointerFine]: {
      selectors: {
        [`${tableRow}:hover &`]: {
          display: "block",
        },
      },
    },
  },
});
