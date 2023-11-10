import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const newEventForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});
