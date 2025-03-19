import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const inboxMessagesContainer = style({
  display: "grid",
  gridTemplateColumns: "auto min-content",
  columnGap: vars.spacing.normal,
  gridTemplateRows: "repeat(10, min-content)",

  "@media": {
    [breakpoints.tablet]: {
      columnGap: vars.spacing.large,
    },
  },
});

export const inboxMessagesNoMessages = style({
  marginTop: 100,
  padding: vars.spacing.normal,
  textAlign: "center",
});

export const inboxMessage = style({
  display: "grid",
  padding: padding(vars.spacing.small, vars.spacing.normal),
  minHeight: vars.sizes.large,
  textDecoration: "none",
  color: vars.fontColors.primary,
  position: "relative",

  gridColumn: "1/-1",
  gridTemplateColumns: "subgrid",
  gridAutoRows: `minmax(${vars.sizes.large}, auto)`,

  alignItems: "center",
  borderBottom: `1px solid ${vars.colors.borderDefault}`,

  selectors: {
    "&:first-child": {
      borderTop: `1px solid ${vars.colors.borderDefault}`,
    },
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});

export const inboxMessageSender = style({
  whiteSpace: "nowrap",
});

export const inboxMessageSubject = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
