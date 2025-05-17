import { vars } from "../../app/theme.css";
import { fieldBase } from "../Form/style.css";
import { style } from "@vanilla-extract/css";

export const wysiwygEditorContainer = style([fieldBase, {}]);
export const wysiwygEditor = style({
  height: "400px",
  padding: vars.spacing.small,
  outline: "none",
});
