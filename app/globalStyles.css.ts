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
  lineHeight: 1,
  fontSmooth: "always",
  MozOsxFontSmoothing: "always",
  WebkitFontSmoothing: "always",
  color: vars.fontColors.primary,
  fontFamily: vars.fontFamilies.text,
  fontSize: vars.fontSizes.normal,
  fontWeight: 600,
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
