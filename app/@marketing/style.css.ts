import { breakpoints, vars } from "../theme.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

const section = style({});

export const centerContent = style({
  textAlign: "center",
  lineHeight: 1.4,
  "@media": {
    [breakpoints.tablet]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const featuresSection = style([
  section,
  {
    "@media": {
      [breakpoints.desktop]: {
        width: 1000,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  },
]);

export const tabLayoutTabs = style({
  width: "100%",
  overflow: "auto",
  borderRadius: 0,

  "@media": {
    [breakpoints.tablet]: {
      width: "auto",
      borderRadius: vars.borderRadius,
    },
  },
});

export const sideBySideFeature = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: vars.spacing.large,
  width: "100%",
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.desktop]: {
      gridTemplateColumns: "auto 60%",
    },
  },

  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.xl,
    },
  },
});

export const sideBySideFeatureReversed = style([
  sideBySideFeature,
  {
    "@media": {
      [breakpoints.desktop]: {
        gridTemplateColumns: "60% auto",
      },
    },
  },
]);

export const sideBySideTextContainer = style({
  paddingTop: vars.spacing.normal,
  selectors: {
    [`${sideBySideFeatureReversed} &`]: {
      order: 2,
    },
  },
});

export const sideBySideImageStack = style({
  position: "relative",
});

export const sideBySideImage = style({
  borderRadius: vars.borderRadius,
  border: "2px solid " + vars.colors.grey100,
  boxShadow: `0.3px 0.5px 0.7px hsl(0deg 0% 63% / 0.36),
  0.8px 1.6px 2px -0.8px hsl(0deg 0% 63% / 0.36),
  2.1px 4.1px 5.2px -1.7px hsl(0deg 0% 63% / 0.36),
  5px 10px 12.6px -2.5px hsl(0deg 0% 63% / 0.36);`,

  selectors: {
    [`${sideBySideImageStack} &`]: {
      position: "absolute",
      top: calc(vars.spacing.small).negate().toString(),
      // left: calc(vars.spacing.small).negate().toString(),
      right: calc(vars.spacing.small).negate().toString(),
      maxHeight: 200,
      maxWidth: "75%",
    },
    [`${sideBySideFeatureReversed} ${sideBySideImageStack} &`]: {
      left: calc(vars.spacing.small).negate().toString(),
      right: "unset",
    },
  },
});

export const sideBySideImageStackRootImage = style([
  sideBySideImage,
  {
    selectors: {
      [`${sideBySideImageStack} &`]: {
        position: "relative",

        top: 0,
        right: 0,
        left: 0,
        maxHeight: "unset",
        maxWidth: "100%",

        zIndex: -1,
      },

      [`${sideBySideFeatureReversed} ${sideBySideImageStack} &`]: {
        left: 0,
        right: 0,
      },
    },
  },
]);

export const landingWrapper = style({
  marginBottom: 100,
});

const sectionHeader = style({});

export const ctaSection = style([
  {
    paddingTop: 100,
    textAlign: "center",
    marginBottom: 100,
  },
]);
export const ctaHeader = style([
  sectionHeader,
  {
    fontSize: vars.fontSizes.xxl,
  },
]);

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

export const ctaButton = style({
  width: "100%",
  maxWidth: 300,
});

export const staticPageContainer = style({
  padding: padding(
    0,
    vars.spacing.normal,
    vars.spacing.normal,
    vars.spacing.normal,
  ),

  "@media": {
    [breakpoints.tablet]: {
      padding: 0,
      paddingBottom: vars.spacing.normal,
      marginLeft: calc(vars.sizes.xxl)
        .add(calc(vars.spacing.xs).multiply(2))
        .toString(),
      marginRight: calc(vars.sizes.xxl)
        .add(calc(vars.spacing.xs).multiply(2))
        .toString(),
    },
  },
});

export const centeredStaticPageContainer = style({
  display: "flex",
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      marginTop: "-72px",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});
