import { breakpoints } from "../../app/theme.css";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const grid = style({
  display: "grid",
});

export const gridTemplateColumnsBase = createVar();
export const gridTemplateColumnsMobile = createVar();
export const gridTemplateColumnsMobilePlus = createVar();
export const gridTemplateColumnsTablet = createVar();
export const gridTemplateColumnsTabletPlus = createVar();
export const gridTemplateColumnsDesktop = createVar();

export const gridColumns = style({
  gridTemplateColumns: `repeat(${gridTemplateColumnsBase}, 1fr)`,

  "@media": {
    [breakpoints.mobile]: {
      gridTemplateColumns: `repeat(${fallbackVar(
        gridTemplateColumnsMobile,
        gridTemplateColumnsBase,
      )}, 1fr)`,
    },
    [breakpoints.mobilePlus]: {
      gridTemplateColumns: `repeat(${fallbackVar(
        gridTemplateColumnsMobilePlus,
        gridTemplateColumnsMobile,
        gridTemplateColumnsBase,
      )}, 1fr)`,
    },
    [breakpoints.tablet]: {
      gridTemplateColumns: `repeat(${fallbackVar(
        gridTemplateColumnsTablet,
        gridTemplateColumnsMobilePlus,
        gridTemplateColumnsMobile,
        gridTemplateColumnsBase,
      )}, 1fr)`,
    },
    [breakpoints.tabletPlus]: {
      gridTemplateColumns: `repeat(${fallbackVar(
        gridTemplateColumnsTabletPlus,
        gridTemplateColumnsTablet,
        gridTemplateColumnsMobilePlus,
        gridTemplateColumnsMobile,
        gridTemplateColumnsBase,
      )}, 1fr)`,
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: `repeat(${fallbackVar(
        gridTemplateColumnsDesktop,
        gridTemplateColumnsTabletPlus,
        gridTemplateColumnsTablet,
        gridTemplateColumnsMobilePlus,
        gridTemplateColumnsMobile,
        gridTemplateColumnsBase,
      )}, 1fr)`,
    },
  },
});
