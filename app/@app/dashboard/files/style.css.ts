import { breakpoints, vars } from "../../../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const filesPageContainer = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100%",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto minmax(auto, 500px)",
    },
  },
});

export const filesList = style({
  maxWidth: "100%",
  borderSpacing: 0,
});

export const filesListFile = style({
  overflow: "hidden",
  position: "relative",
  backgroundColor: vars.colors.grey50,
  borderRadius: vars.borderRadius,
  marginBottom: vars.spacing.small,
});

export const filesListFileHeader = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const filesListFileHeaderName = style({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

export const fileListFileIcon = style({
  height: vars.sizes.xs,
  marginRight: vars.spacing.small,
  verticalAlign: "middle",
  float: "left",
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
