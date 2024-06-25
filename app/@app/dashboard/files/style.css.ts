import { breakpoints, vars } from "../../../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const filesPageContainer = style({
  display: "grid",
  gap: vars.spacing.normal,
  gridTemplateRows: "min-content auto",
  gridTemplateColumns: "100vw",

  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "auto 450px",
    },
  },
});

export const filesList = style({
  maxWidth: "100%",
  borderSpacing: 0,
});

export const filesListFileContainer = style({
  selectors: {
    "&:not(:last-child)": {
      marginBottom: vars.spacing.normal,
    },
  },
});

export const filesListFileContainerFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.spacing.small,
  color: vars.fontColors.secondary,
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

export const filesSearchForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
});

export const filesSearchInput = style({
  "@media": {
    [breakpoints.tablet]: {
      flex: 1,
    },
  },
});

export const filesSearchClear = style({
  flexShrink: 0,
});
