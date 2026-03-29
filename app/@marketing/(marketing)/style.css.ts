import { breakpoints, vars } from "../../theme.css";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../../theme";

const section = style({});

export const pricingGrid = style({});

globalStyle(`${pricingGrid} > div`, {
  "@media": {
    [breakpoints.desktop]: {
      alignItems: "center",
    },
  },
});

export const centerContent = style({
  textAlign: "center",
  lineHeight: vars.lineHeights.relaxed,
  "@media": {
    [breakpoints.tablet]: {
      maxWidth: vars.containerWidth.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

export const featuresSection = style([
  section,
  {
    position: "relative",
    zIndex: 1,
    padding: `0 ${vars.spacing.normal}`,

    "@media": {
      [breakpoints.desktop]: {
        maxWidth: vars.containerWidth.lg,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 0,
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
      borderRadius: vars.borderRadius.md,
    },
  },
});

export const sideBySideFeature = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.spacing["40"],
  width: "100%",
  padding: `${vars.spacing.large} 0`,
  alignItems: "center",

  "@media": {
    [breakpoints.desktop]: {
      gridTemplateColumns: "5fr 7fr",
      padding: `${vars.spacing["48"]} 0`,
    },
  },

  selectors: {
    "&:not(:last-child)": {
      borderBottom: `1px solid ${vars.colors.borderDefault}`,
    },
  },
});

export const sideBySideFeatureReversed = style([
  sideBySideFeature,
  {
    "@media": {
      [breakpoints.desktop]: {
        gridTemplateColumns: "7fr 5fr",
      },
    },
  },
]);

export const sideBySideTextContainer = style({
  paddingTop: vars.spacing.small,
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
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.colors.borderDefault}`,
  boxShadow: vars.shadows.lg,

  selectors: {
    [`${sideBySideImageStack} &`]: {
      position: "absolute",
      top: calc(vars.spacing.small).negate().toString(),
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
  position: "relative",
});

const sectionHeader = style({});

const float1 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(40px, -50px) scale(1.08)" },
  "66%": { transform: "translate(-30px, 30px) scale(0.92)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const float2 = keyframes({
  "0%": { transform: "translate(0, 0) rotate(0deg)" },
  "50%": { transform: "translate(-50px, -40px) rotate(180deg)" },
  "100%": { transform: "translate(0, 0) rotate(360deg)" },
});

const float3 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "25%": { transform: "translate(60px, 25px) scale(1.12)" },
  "50%": { transform: "translate(25px, -40px) scale(0.88)" },
  "75%": { transform: "translate(-40px, 15px) scale(1.06)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const pulse = keyframes({
  "0%": { opacity: "0.5", transform: "scale(1)" },
  "50%": { opacity: "0.7", transform: "scale(1.05)" },
  "100%": { opacity: "0.5", transform: "scale(1)" },
});

export const ctaSection = style([
  {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    padding: `${vars.spacing.xl} ${vars.spacing.normal}`,
    overflow: "hidden",
  },
]);

export const orbWrapper = style({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: -1,
  transition: "opacity 0.1s linear",
});

export const ctaBackground = style({
  position: "absolute",
  inset: 0,
  transition: "transform 0.3s ease-out",
});

const orbBase = style({
  position: "absolute",
  borderRadius: "50%",
});

export const orb1 = style([
  orbBase,
  {
    width: 500,
    height: 500,
    top: "-10%",
    left: "-5%",
    background: `radial-gradient(circle, ${vars.colors.indigo300} 0%, ${vars.colors.indigo200} 30%, transparent 70%)`,
    opacity: 0.5,
    animation: `${float1} 18s ease-in-out infinite`,
    filter: "blur(40px)",
  },
]);

export const orb2 = style([
  orbBase,
  {
    width: 280,
    height: 280,
    top: "10%",
    right: "8%",
    border: `2.5px solid ${vars.colors.indigo300}`,
    background: "transparent",
    opacity: 0.6,
    animation: `${float2} 22s ease-in-out infinite`,
    boxShadow: [
      `inset 0 -4px 12px -4px ${vars.colors.indigo500}`,
      `inset 0 4px 12px -4px ${vars.colors.indigo100}`,
      `0 4px 16px -6px ${vars.colors.indigo400}`,
      `0 -2px 10px -4px rgba(255,255,255,0.08)`,
    ].join(", "),
  },
]);

export const orb3 = style([
  orbBase,
  {
    width: 180,
    height: 180,
    bottom: "15%",
    left: "20%",
    background: `radial-gradient(circle, ${vars.colors.indigo400} 0%, ${vars.colors.indigo200} 40%, transparent 70%)`,
    opacity: 0.45,
    animation: `${pulse} 6s ease-in-out infinite`,
    filter: "blur(20px)",
  },
]);

export const orb4 = style([
  orbBase,
  {
    width: 400,
    height: 400,
    top: "-5%",
    right: "-8%",
    background: `radial-gradient(circle, ${vars.colors.indigo200} 0%, ${vars.colors.indigo100} 40%, transparent 70%)`,
    opacity: 0.55,
    animation: `${float1} 20s ease-in-out infinite reverse`,
    filter: "blur(30px)",
  },
]);

export const orb5 = style([
  orbBase,
  {
    width: 120,
    height: 120,
    bottom: "25%",
    right: "25%",
    border: `2px solid ${vars.colors.indigo400}`,
    background: "transparent",
    opacity: 0.5,
    animation: `${float3} 14s ease-in-out infinite reverse`,
    boxShadow: [
      `inset 0 -3px 8px -3px ${vars.colors.indigo600}`,
      `inset 0 3px 8px -3px ${vars.colors.indigo200}`,
      `0 3px 10px -4px ${vars.colors.indigo500}`,
      `0 -2px 8px -4px rgba(255,255,255,0.06)`,
    ].join(", "),
  },
]);

export const orb6 = style([
  orbBase,
  {
    width: 60,
    height: 60,
    top: "35%",
    left: "15%",
    background: vars.colors.indigo300,
    opacity: 0.4,
    animation: `${pulse} 4s ease-in-out infinite 1s`,
    filter: "blur(8px)",
  },
]);

export const orb7 = style([
  orbBase,
  {
    width: 40,
    height: 40,
    top: "25%",
    right: "35%",
    background: vars.colors.indigo400,
    opacity: 0.35,
    animation: `${pulse} 5s ease-in-out infinite 2s`,
    filter: "blur(4px)",
  },
]);

export const ctaContent = style({
  position: "relative",
  zIndex: 1,
});

export const landingContent = style({
  position: "relative",
  zIndex: 1,
});

export const ctaHeader = style([
  sectionHeader,
  {
    fontSize: "clamp(30px, 5.5vw, 56px)",
    lineHeight: vars.lineHeights.tight,
    letterSpacing: vars.letterSpacing.tight,
    fontFamily: vars.fontFamilies.primaryHeader,
    maxWidth: "640px",
  },
]);

export const ctaAccent = style({
  color: vars.colors.primary,
  fontFamily: vars.fontFamilies.secondaryHeader,
  fontStyle: "italic",
});

export const featureAccent = style({
  color: vars.colors.primary,
});

export const ctaLink = style({
  display: "block",
  width: "100%",
  maxWidth: "280px",
  textDecoration: "none",
});

export const ctaButton = style({
  width: "100%",
});

export const sectionDivider = style({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: vars.containerWidth.lg,
  margin: "0 auto",
  padding: `${vars.spacing.xl} ${vars.spacing.normal}`,

  "@media": {
    [breakpoints.tablet]: {
      padding: `${vars.spacing.xxl} ${vars.spacing.normal}`,
    },
  },
});

export const staticPageContainer = style({
  padding: padding(
    vars.spacing.large,
    vars.spacing.normal,
    vars.spacing.large,
    vars.spacing.normal,
  ),
  maxWidth: vars.containerWidth.lg,
  marginLeft: "auto",
  marginRight: "auto",

  "@media": {
    [breakpoints.tablet]: {
      padding: `${vars.spacing["48"]} ${vars.spacing.large}`,
    },
  },
});

export const centeredStaticPageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  padding: `${vars.spacing.xl} ${vars.spacing.normal}`,
});
