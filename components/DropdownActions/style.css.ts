import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../theme";

export const actionRow = style({
  display: "flex",
  gap: vars.spacing.small,
  justifyContent: "flex-start",
  alignItems: "center",
  whiteSpace: "nowrap",
  padding: padding(vars.spacing.small, vars.spacing.small),
  cursor: "pointer",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});
