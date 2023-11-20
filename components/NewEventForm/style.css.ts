import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const newEventForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
