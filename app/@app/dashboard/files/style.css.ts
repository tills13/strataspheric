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
  overflow: "hidden",
  backgroundColor: vars.colors.grey50,
  borderRadius: vars.borderRadius,
});

export const filesListFileHeader = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const filesListDetails = style({
  // marginTop: "3px",
});

export const filesListFileDescription = style({
  overflow: "hidden",
  display: "-webkit-box",

  lineClamp: 2,

  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  marginLeft: calc(vars.sizes.xs).add(vars.spacing.normal).toString(),
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

export const filesListFileFooter = style({
  textAlign: "end",
});

export const filesListFileUploadDate = style({
  color: vars.fontColors.secondary,
  fontSize: vars.fontSizes.small,
});

export const fileActionsContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  alignItems: "center",
});

export const filesSearchClear = style({
  width: "auto",
  flexShrink: 0,
  flexGrow: 0,
});
