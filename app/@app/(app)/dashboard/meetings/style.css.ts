import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

import { border, padding } from "../../../../../theme";

export const meetingsList = style({});

export const inboxMessagesContainer = style({
  width: "100%",
  height: "100%",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      display: "table",
      height: "auto",
    },
  },
});

export const inboxMessagesTableRow = style({
  display: "flex",
  padding: vars.spacing.normal,
  flexWrap: "wrap",
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
  textDecoration: "none",
  color: vars.fontColors.primary,
  position: "relative",

  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
      display: "table-row",
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const tableCell = style({
  "@media": {
    [breakpoints.tablet]: {
      padding: padding(vars.spacing.small, vars.spacing.normal),
      display: "table-cell",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
    },
  },
});

export const senderNameCell = style([
  tableCell,
  {
    marginBottom: vars.spacing.small,

    "@media": {
      [breakpoints.tablet]: {
        marginBottom: 0,
      },
    },
  },
]);

export const subjectCell = style([
  tableCell,
  {
    width: "100%",
    marginBottom: vars.spacing.small,
    fontWeight: 700,

    "@media": {
      [breakpoints.tablet]: {
        marginBottom: 0,
        width: "auto",
      },
    },
  },
]);

export const unreadDot = style({
  display: "block",
  content: "&nbsp;",
  width: vars.sizes.xxs,
  height: vars.sizes.xxs,
  backgroundColor: vars.colors.grey700,
  borderRadius: "50%",
});

export const statusCell = style([
  tableCell,
  {
    paddingTop: "6px",
    paddingRight: vars.spacing.small,
  },
]);

export const messageCell = style([
  tableCell,
  {
    color: vars.colors.grey500,
    width: "100%",
    marginBottom: vars.spacing.normal,

    "@media": {
      [breakpoints.tablet]: {
        marginBottom: 0,
      },
    },
  },
]);

export const chatsCell = style([
  tableCell,
  {
    display: "none",

    "@media": {
      [breakpoints.tablet]: {
        display: "table-cell",
      },
    },
  },
]);

export const sentAtCell = style([
  tableCell,
  {
    justifySelf: "flex-end",
    "@media": {
      [breakpoints.tablet]: {
        justifySelf: "unset",
      },
    },
  },
]);

export const actionsCell = style([
  tableCell,
  {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: vars.spacing.normal,
    right: vars.spacing.normal,

    "@media": {
      [breakpoints.tablet]: {
        position: "relative",
        top: 0,
        right: 0,
      },
    },
  },
]);
