import { vars } from "../../app/theme.css";
import * as linkStyles from "../Link/style.css";
import { style } from "@vanilla-extract/css";

export const signInForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const signInFormInput = style({
  width: "100%",
});

export const forgotLink = style([
  linkStyles.link,
  {
    textAlign: "center",
    fontSize: vars.fontSizes.normal,
  },
]);
