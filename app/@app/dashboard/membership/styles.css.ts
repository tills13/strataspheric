import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

import { padding } from "../../../../theme";

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
