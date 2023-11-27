import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../theme";

export const formSubmitStatusButton = style([
  {
    display: important("flex"),
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing.normal,
  },
]);

export const statusIcon = style({
  height: vars.sizes.small,
});
