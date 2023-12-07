import * as buttonStyles from "../../../components/Button/style.css";
import { breakpoints, vars } from "../../theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const section = style({});
export const sectionPadded = style([section, { padding: vars.spacing.normal }]);

// util styles
export const marginBottom = styleVariants({
  normal: {
    marginBottom: vars.spacing.normal,
  },
  large: {
    marginBottom: vars.spacing.large,
  },
});

export const centerContent = style({
  "@media": {
    [breakpoints.tablet]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const featuresSection = style([
  sectionPadded,
  {
    "@media": {
      [breakpoints.tablet]: {
        width: 1000,
        margin: "auto",
      },
    },
  },
]);

export const sideBySideFeature = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: vars.spacing.normal,
  width: "100%",
  overflow: "hidden",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto 60%",
    },
  },
});

export const sideBySideText = style({
  paddingTop: vars.spacing.normal,
  fontSize: vars.fontSizes.large,
});

export const sideBySideImage = style({
  borderRadius: vars.borderRadius,
});

export const landingWrapper = style({
  marginBottom: 100,
});

export const sectionHeader = style({
  marginBottom: vars.spacing.normal,
});

export const plansSection = style({
  marginTop: 100,
  textAlign: "center",
});

export const plansSectionHeader = style([
  sectionHeader,
  {
    marginBottom: vars.spacing.xl,
  },
]);

export const ctaSection = style([
  sectionPadded,
  {
    paddingTop: 100,
    textAlign: "center",
    marginBottom: 100,
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
  buttonStyles.buttonFullWidth,
  buttonStyles.buttonSizes.large,
  buttonStyles.buttonVariants.primary,
]);

export const plansContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 300px)",
  justifyContent: "center",
  gap: vars.spacing.normal,
  marginBottom: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "repeat(3, 300px)",
    },
  },
});
