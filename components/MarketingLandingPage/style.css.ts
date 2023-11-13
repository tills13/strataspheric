import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";
import { border } from "../../theme";

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

export const sectionPadded = style([section, { padding: vars.spacing.normal }]);

export const ctaSection = style([
  sectionPadded,
  {
    textAlign: "center",
  },
]);
export const ctaHeader = style([sectionHeader, {}]);
export const ctaText = style({
  marginBottom: vars.spacing.normal,
});
export const ctaButton = style({});
