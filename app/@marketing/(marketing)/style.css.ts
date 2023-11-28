import * as buttonStyles from "../../../components/Button/style.css";
import { breakpoints, vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const landingWrapper = style({
  marginBottom: 100,
});

export const section = style({});

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

export const ctaLink = style({
  display: "block",
  width: "80%",
  margin: "auto",
  textDecoration: "none",
  "@media": {
    [breakpoints.tablet]: {
      width: "300px",
    },
  },
});
export const ctaButton = style([
  buttonStyles.button,
  buttonStyles.buttonSizes.large,
  buttonStyles.buttonVariants.primary,
]);

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
