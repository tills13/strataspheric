import { breakpoints, vars } from "../../../theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

import { border, padding } from "../../../../theme";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
  },
});

export const pageSecondaryTitle = style({
  marginBottom: vars.spacing.large,
  padding: padding("0", vars.spacing.normal),
  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
    },
  },
});

export const leftColumn = style({ flex: 1 });

export const filesPageContainer = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100%",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto minmax(auto, 500px)",
    },
  },
});

export const membershipGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: vars.spacing.normal,
  padding: padding(0, vars.spacing.normal),

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const membershipTile = style({
  padding: vars.spacing.normal,
  border: border("2px", "solid", vars.colors.borderDefault),
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey50,
});

export const membershipTileDetails = style({
  display: "grid",
  gridTemplateColumns: "min-content auto",
});

export const membershipTileDt = style({
  gridColumn: 1,
  fontWeight: vars.fontWeights.xbold,
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.xs,
    },
  },
});
export const membershipTileDd = style({
  gridColumn: 2,
  textAlign: "right",
  color: vars.fontColors.secondary,
});
