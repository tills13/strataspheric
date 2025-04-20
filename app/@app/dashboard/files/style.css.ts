import { breakpoints, vars } from "../../../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const filesPageContainer = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100%",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto 400px",
    },
  },
});

export const filesList = style({
  maxWidth: "100%",
  borderSpacing: 0,
});

export const filesListFile = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateColumns: "48px auto",
  gridTemplateRows: "min-content auto",
});

export const filesListFileIcon = style({
  justifySelf: "center",
});

export const filesListFileDescription = style({
  overflow: "hidden",
  display: "-webkit-box",

  lineClamp: 2,

  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});

export const fileListLink = style({ display: "block", overflow: "hidden" });

export const filesListFileHeaderName = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const fileListFileIcon = style({
  height: vars.sizes.xs,
});

export const filesListFileVisibilityIcon = style({
  height: vars.sizes.xxs,
});

export const filesSearchClear = style({
  width: "auto",
  flexShrink: 0,
  flexGrow: 0,
});
