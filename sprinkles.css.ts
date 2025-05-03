import { vars } from "./app/theme.css";

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const textProperties = defineProperties({
  properties: {
    color: {
      ...vars.colors,
      ...vars.fontColors,
    },
    fontFamily: vars.fontFamilies,
    fontWeight: vars.fontWeights,
    fontSize: vars.fontSizes,
    textAlign: {
      center: "center",
      start: "start",
      end: "end",
    },
    textDecoration: {
      underline: "underline",
      none: "none",
    },
    textTransform: {
      capitalize: "capitalize",
      lowercase: "lowercase",
      uppercase: "uppercase",
    },
    whiteSpace: {
      nowrap: "nowrap",
      pre: "pre",
      "pre-wrap": "pre-wrap",
    },
  },
  shorthands: {
    fc: ["color"],
    ff: ["fontFamily"],
    fw: ["fontWeight"],
    fs: ["fontSize"],
    ta: ["textAlign"],
    td: ["textDecoration"],
    tt: ["textTransform"],
    ws: ["whiteSpace"],
  },
});

const sizeProperties = defineProperties({
  properties: {
    width: {
      ...vars.sizes,
      full: "100%",
    },
    height: {
      ...vars.sizes,
      full: "100%",
    },
  },
  shorthands: {
    w: ["width"],
    h: ["height"],
  },
});

const flexProperties = defineProperties({
  properties: {
    alignItems: {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch",
    },
    flex: {
      1: "1",
    },
    flexDirection: {
      row: "row",
      column: "column",
    },
    justifyContent: {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      "space-between": "space-between",
      stretch: "stretch",
    },
    gap: vars.spacing,
  },
});

const paddingProperties = defineProperties({
  properties: {
    padding: vars.spacing,
    paddingBottom: vars.spacing,
    paddingTop: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,
  },
  shorthands: {
    p: ["padding"],
    pb: ["paddingBottom"],
    ph: ["paddingLeft", "paddingRight"],
    pv: ["paddingTop", "paddingBottom"],
  },
});

const marginProperties = defineProperties({
  properties: {
    marginBottom: vars.spacing,
    marginTop: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,
  },
  shorthands: {
    mb: ["marginBottom"],
    mt: ["marginTop"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mv: ["marginTop", "marginBottom"],
    mh: ["marginLeft", "marginRight"],
  },
});

export const s = createSprinkles(
  marginProperties,
  paddingProperties,
  sizeProperties,
  textProperties,
  flexProperties,
);

export type S = Parameters<typeof s>[0];
