import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const userInitialsAvatar = style({
  display: "block",
  aspectRatio: "1/1",
  width: vars.sizes.normal,
  borderRadius: "50%",
});
