import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const strataSearchContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.large,
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "360px 1fr",
      gap: vars.spacing["40"],
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
  backgroundColor: vars.surfaces.sunken,
  borderRadius: vars.borderRadius.lg,
  transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,
  border: `${vars.borderWidth} solid ${vars.colors.grey100}`,

  selectors: {
    "&:hover": {
      backgroundColor: vars.surfaces.raised,
      border: `${vars.borderWidth} solid ${vars.colors.primary}`,
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
