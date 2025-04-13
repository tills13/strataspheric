import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const strataSearchContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "400px auto",
    },
  },
});

export const stratasList = style({
  listStyle: "none",
  marginLeft: 0,
});

export const stratasListItem = style({
  display: "block",
  padding: vars.spacing.normal,
  color: vars.fontColors.primary,
  textDecoration: "none",
  backgroundColor: vars.colors.grey100,
  borderRadius: vars.borderRadius,
  border: `2px solid ${vars.colors.grey100}`,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.white,
      border: `2px solid ${vars.colors.primary}`,
    },
  },
});

export const stratasListItemContainer = style({
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.normal,
    },
  },
});

export const stratasListItemArrow = style({
  height: vars.fontSizes.large,
  float: "right",
  clear: "both",
});
