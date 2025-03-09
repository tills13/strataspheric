import { vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../../theme";

export const header = style({
  marginBottom: vars.spacing.large,
});

export const blurb = style({
  color: vars.fontColors.secondary,
});

export const submitButton = style({
  width: "100%",
});

export const submitButtonIcon = style({
  fill: important(vars.colors.green500),
  height: vars.sizes.small,
});

export const submitPendingContainer = style({
  textAlign: "center",
});
