import { vars } from "../../app/theme.css";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const heightVar = createVar();

export const leafletMapContainer = style({
  width: "100%",
  height: fallbackVar(heightVar, "200px"),
  borderRadius: vars.borderRadius,
});
