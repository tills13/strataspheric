import { createGlobalTheme, createVar } from "@vanilla-extract/css";

export const breakpoints = {
  mobile: "(min-width: 320px)",
  mobilePlus: "(min-width: 500px)",
  tablet: "(min-width: 640px)",
  tabletPlus: "(min-width: 800px)",
  desktop: "(min-width: 1200px)",
};

export const media = {
  pointerFine: "(pointer: fine)",
  pointerCoarse: "(pointer: coarse)",
};

export const iconColorVar = createVar();
export const fontHeaderVar = createVar();
export const fontPrimaryVar = createVar();
export const sidebarWidthVar = createVar();

export const vars = createGlobalTheme(":root", {
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  borderWidth: "1.5px",

  spacing: {
    "0": "0px",
    xxs: "2px",
    xs: "4px",
    "6": "6px",
    small: "8px",
    "10": "10px",
    "12": "12px",
    normal: "16px",
    "20": "20px",
    "24": "24px",
    large: "32px",
    "40": "40px",
    "48": "48px",
    xl: "64px",
    xxl: "128px",
  },

  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
    md: "0 2px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
    lg: "0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.06)",
    xl: "0 8px 16px rgba(0,0,0,0.08), 0 20px 40px rgba(0,0,0,0.08)",
  },

  transitions: {
    fast: "120ms ease",
    normal: "180ms ease",
    slow: "280ms ease",
  },

  focusRing: "0 0 0 3px rgba(67, 56, 202, 0.18)",

  sizes: {
    xxs: "16px",
    xs: "24px",
    small: "32px",
    normal: "40px",
    large: "48px",
    xl: "56px",
    xxl: "64px",
    xxl2: "128px",
    xxl3: "256px",
    xxl4: "512px",
  },

  fontSizes: {
    xs: "12px",
    small: "12px",
    normal: "14px",
    medium: "16px",
    large: "18px",
    larger: "20px",
    xl: "24px",
    xxl: "30px",
    xxxl: "36px",
  },

  fontWeights: {
    light: "300",
    normal: "400",
    medium: "500",
    bold: "600",
    xbold: "800",
  },

  lineHeights: {
    none: "1",
    tight: "1.2",
    snug: "1.3",
    normal: "1.5",
    relaxed: "1.6",
    loose: "1.75",
  },

  letterSpacing: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  colors: {
    white: "#ffffff",
    black: "#0f1115",

    red100: "#FEE2E2",
    red300: "#F87171",
    red500: "#DC2626",
    red700: "#B91C1C",
    red900: "#7F1D1D",

    green100: "#DCFCE7",
    green300: "#86EFAC",
    green500: "#16A34A",
    green700: "#15803D",
    green900: "#14532D",

    orange100: "#FFF7ED",
    orange300: "#FDBA74",
    orange500: "#EA580C",
    orange700: "#C2410C",
    orange900: "#7C2D12",

    grey0: "#FAFAFA",
    grey50: "#F5F5F6",
    grey100: "#EBEBED",
    grey200: "#D4D4D8",
    grey300: "#A1A1AA",
    grey400: "#8B8B94",
    grey500: "#71717A",
    grey600: "#52525B",
    grey700: "#3F3F46",
    grey800: "#27272A",
    grey900: "#18181B",

    blue50: "#EFF6FF",
    blue100: "#DBEAFE",
    blue200: "#BFDBFE",
    blue300: "#93C5FD",
    blue400: "#60A5FA",
    blue500: "#3B82F6",
    blue600: "#2563EB",
    blue700: "#1D4ED8",
    blue800: "#1E40AF",
    blue900: "#1E3A8A",

    indigo50: "#EEF2FF",
    indigo100: "#E0E7FF",
    indigo200: "#C7D2FE",
    indigo300: "#A5B4FC",
    indigo400: "#818CF8",
    indigo500: "#6366F1",
    indigo600: "#4F46E5",
    indigo700: "#4338CA",
    indigo800: "#3730A3",
    indigo900: "#312E81",

    primary: "#4338CA",
    primaryHover: "#3730A3",

    secondary: "#3F3F46",
    secondaryHover: "#52525B",

    success: "#16A34A",
    error: "#DC2626",
    warning: "#EA580C",

    borderDefault: "#E4E4E7",
    borderDefaultHover: "#D4D4D8",
  },

  surfaces: {
    page: "#FAFAFA",
    raised: "#FFFFFF",
    overlay: "#FFFFFF",
    sunken: "#F5F5F6",
    interactive: "#FAFAFA",
    interactiveHover: "#F5F5F6",
  },

  fontColors: {
    primary: "#18181B",
    primaryHover: "#09090B",
    secondary: "#52525B",
    tertiary: "#636370",
    placeholder: "#8B8B94",
    primaryInverse: "#FAFAFA",
  },

  fontFamilies: {
    primary: fontPrimaryVar,
    secondaryHeader: fontHeaderVar,
    primaryHeader: fontHeaderVar,
    text: fontPrimaryVar,
  },

  opacity: {
    disabled: "0.4",
    muted: "0.6",
    subtle: "0.8",
  },

  containerWidth: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  zIndex: {
    front: "1000",
    header: "1001",
    modal: "1011",
  },
});
