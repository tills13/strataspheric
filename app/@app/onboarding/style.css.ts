import { vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  margin: `${vars.spacing.large} auto 0`,
  width: "100%",
  maxWidth: 600,
  padding: vars.spacing.normal,
  overflow: "auto",
});
