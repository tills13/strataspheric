import { breakpoints, vars } from "../../../../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { padding } from "../../../../../theme";

export const marginBottom = styleVariants({
  small: {
    marginBottom: vars.spacing.small,
  },
  normal: {
    marginBottom: vars.spacing.normal,
  },
});

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

export const fileActionsContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  alignItems: "center",
});

export const descriptionCell = style([
  filesTableCell,
  {
    width: "100%",
  },
]);

export const fileSearchContainer = style({
  width: "100%",
  padding: vars.spacing.normal,
  margin: "auto",
  "@media": {
    [breakpoints.tablet]: {
      width: 700,
    },
  },
});

export const filesSearchForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "flex-start",
      flexDirection: "row",
    },
  },
});

export const filesSearchInput = style({
  "@media": {
    [breakpoints.tablet]: {
      flex: 1,
    },
  },
});

export const filesSearchClear = style({
  flexShrink: 0,
});
