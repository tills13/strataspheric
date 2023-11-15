import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../theme.css";
import { border, important, padding } from "../../../theme";

export const pageContainer = style({
  // padding: vars.
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
  width: "100%",
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

export const continuePanel = style({
  position: "fixed",
  bottom: vars.spacing.small,
  left: vars.spacing.small,
  right: vars.spacing.small,
  zIndex: 2,

  "@media": {
    [breakpoints.tablet]: {
      bottom: vars.spacing.normal,
      left: "unset",
      right: vars.spacing.normal,
      width: 400,
      margin: "auto",
    },
  },
});

export const continuePanelHeader = style({
  marginBottom: vars.spacing.normal,
});

export const continuePanelList = style({});
export const continuePanelListButton = style({
  width: "100%",
});
