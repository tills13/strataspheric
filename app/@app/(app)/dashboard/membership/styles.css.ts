import { breakpoints, vars } from "../../../../theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

import { border, padding } from "../../../../../theme";

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

export const membershipTableContainer = style({
  width: "100vw",
  overflow: "auto",
  marginBottom: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      width: "100%",
    },
  },
});

export const membershipGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,

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
});

export const membershipTileHeader = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: vars.spacing.normal,
  gap: vars.spacing.normal,
});

export const membershipTileActions = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  gap: vars.spacing.small,
  flex: 1,
});

export const membershipTileDetails = style({
  display: "grid",
  gridTemplateColumns: "min-content auto",
});

export const membershipTileDt = style({
  gridColumn: 1,
  fontWeight: vars.fontWeights.xbold,
});
export const membershipTileDd = style({
  gridColumn: 2,
  textAlign: "right",
  color: vars.fontColors.secondary,
});
