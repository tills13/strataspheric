import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { important } from "../../theme";

export const header0 = style({
  marginBottom: vars.spacing.normal,
});

export const header1 = style({
  marginBottom: vars.spacing.large,
});

export const blurb = style({
  marginBottom: vars.spacing.large,
});

export const submitButtonIcon = style({
  verticalAlign: "top",
  fill: important(vars.colors.green500),
});

export const submitPendingContainer = style({
  textAlign: "center",
});
