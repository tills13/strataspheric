import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const amentitiesContainer = style({
  padding: vars.spacing.normal,
});

export const amentity = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  overflow: "hidden",
});

export const amentityImage = style({
  flexShrink: 0,
  objectFit: "cover",
  width: 128,
  height: "auto",
  aspectRatio: "1/1",
  borderRadius: vars.borderRadius,
});

export const amenityDescriptionContainer = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const amenityDescription = style({
  flex: 1,
});

export const amentityActionsContainer = style({
  display: "flex",
  justifyContent: "flex-start",

  "@media": {
    [breakpoints.tablet]: {
      justifyContent: "flex-end",
    },
  },
});

export const bookAmenityButton = style({
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      width: "auto",
    },
  },
});
