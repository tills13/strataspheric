import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const inboxMessagesContainer = style({
  display: "grid",
  gridTemplateColumns: "min-content min-content auto min-content",
  columnGap: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      padding: padding(0, vars.spacing.normal),
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

export const inboxMessageSubjectMessage = style({
  overflow: "hidden",
});

export const inboxMessageCheckbox = style({
  "@media": {
    [breakpoints.tablet]: {
      visibility: "hidden",

      selectors: {
        [`${inboxMessage}:hover &, &:has(input[type=checkbox]:checked)`]: {
          visibility: "visible",
        },
      },
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

export const inboxMessageActions = style({
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

  selectors: {
    [`${inboxMessage}:hover &`]: {
      display: "block",
    },
  },
});
