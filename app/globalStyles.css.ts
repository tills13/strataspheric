import { vars } from "./theme.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  padding: 0,
  lineHeight: vars.lineHeights.normal,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  color: vars.fontColors.primary,
  fontFamily: vars.fontFamilies.text,
  fontSize: vars.fontSizes.normal,
  fontWeight: vars.fontWeights.normal,
  backgroundColor: vars.surfaces.page,
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
});

globalStyle("#__next", {
  height: "100%",
});

globalStyle("#root, #__next", {
  isolation: "isolate",
});

globalStyle("#modal-root > :not(:last-child):not(:only-child)", {
  display: "none",
});

globalStyle("button", {
  cursor: "pointer",
  border: "none",
  background: "none",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("table", {
  borderCollapse: "collapse",
  borderSpacing: 0,
});

globalStyle("::selection", {
  backgroundColor: vars.colors.blue100,
  color: vars.colors.blue900,
});
