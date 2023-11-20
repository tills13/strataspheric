import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

import { border } from "../../../theme";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const section = style({
  selectors: {
    [`${pageContainer} &:not(:last-child)`]: {
      borderBottom: border("2px", "solid", vars.colors.borderDefault),
    },
  },
});

export const sectionHeader = style({
  marginBottom: vars.spacing.normal,
});

export const plansSection = style({
  marginTop: 100,
});

export const plansSectionHeader = style([
  sectionHeader,
  {
    marginBottom: vars.spacing.xl,
  },
]);

export const sectionPadded = style([section, { padding: vars.spacing.normal }]);

export const ctaSection = style([
  sectionPadded,
  {
    paddingTop: 100,
    textAlign: "center",
  },
]);
export const ctaHeader = style([sectionHeader, {}]);
export const ctaText = style({
  marginBottom: vars.spacing.normal,
});
export const ctaButton = style({
  width: "80%",
  "@media": {
    [breakpoints.tablet]: {
      width: "300px",
    },
  },
});

export const plansContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 300px)",
  justifyContent: "center",
  gap: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(3, 300px)",
    },
  },
});
