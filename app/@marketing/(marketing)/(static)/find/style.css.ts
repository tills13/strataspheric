import { icon } from "../../../../../components/Icon/style.css";
import { vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const header = style({});

export const input = style({
  width: "100%",
});

export const divider = style({
  marginBottom: vars.spacing.normal,
  width: "100%",
});

export const submitButton = style({
  width: "100%",
  marginBottom: vars.spacing.normal,
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
});

export const stratasListItemContainer = style({
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.normal,
    },
  },
});

export const stratasListItemArrow = style([
  icon,
  {
    height: vars.fontSizes.large,
    float: "right",
    clear: "both",
  },
]);

export const loadingContainer = style({
  textAlign: "center",
});
