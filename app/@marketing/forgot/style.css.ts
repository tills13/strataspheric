import { vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../../theme";

export const header = style({
  marginBottom: vars.spacing.large,
});

export const blurb = style({
  color: vars.fontColors.secondary,
});

export const input = style({
  marginBottom: vars.spacing.normal,
  width: "100%",
});

export const submitButton = style({
  width: "100%",
});

export const submitButtonIcon = style({
  verticalAlign: "top",
  fill: important(vars.colors.green500),
});

export const submitPendingContainer = style({
  textAlign: "center",
});
