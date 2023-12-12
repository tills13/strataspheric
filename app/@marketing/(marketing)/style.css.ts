import * as buttonStyles from "../../../components/Button/style.css";
import { breakpoints, vars } from "../../theme.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const section = style({});
export const sectionPadded = style([section, { padding: vars.spacing.normal }]);

const v = createVar();

/*
--shadow-color: 286deg 36% 56%;
  --shadow-elevation-low:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
  --shadow-elevation-medium:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  --shadow-elevation-high:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),
    2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),
    4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),
    7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),
    11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),
    17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),
    25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);
    */

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
  textAlign: "center",
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
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  },
]);

export const sideBySideFeature = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: vars.spacing.normal,
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto 60%",
    },
  },

  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.xl,
    },
  },
});

export const sideBySideText = style({
  paddingTop: vars.spacing.normal,
  fontSize: vars.fontSizes.large,
});

export const sideBySideImageStack = style({
  position: "relative",
  selectors: {},
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
  },
});

// export const sideBySideImageRight = style([
//   sideBySideImage,
//   {
//     selectors: {
//       [`${sideBySideImageStack} &`]: {
//         left: "unset",
//         right: 0,
//       },
//     },
//   },
// ]);

export const sideBySideImageStackRootImage = style([
  sideBySideImage,
  {
    selectors: {
      [`${sideBySideImageStack} &`]: {
        position: "relative",
        // top: vars.spacing.small,
        // left: vars.spacing.small,
        top: 0,
        right: 0,
        left: 0,
        maxHeight: "unset",
        maxWidth: "100%",

        zIndex: -1,
      },
    },
  },
]);

export const landingWrapper = style({
  marginBottom: 100,
});

export const sectionHeader = style({
  marginBottom: vars.spacing.normal,
});

export const plansSection = style({
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
  buttonStyles.button,
  {
    width: "100%",
    maxWidth: 300,
  },
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
