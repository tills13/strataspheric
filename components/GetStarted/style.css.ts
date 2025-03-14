import { breakpoints, vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

import { important } from "../../theme";

export const getStartedForm = style({});

export const input = style({
  marginBottom: vars.spacing.normal,
  width: "100%",
});

export const isPublicField = style([
  {
    display: "flex",
    gap: vars.spacing.normal,
    alignItems: "center",
    justifyContent: "space-between",
  },
]);

export const subdomainField = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: vars.spacing.small,
  marginBottom: vars.spacing.normal,
});

export const subdomainFieldRootDomain = style({
  opacity: 0.7,
});
export const subdomainFieldSubdomain = style({
  fontWeight: 700,
});

export const subdomainStatusIcon = style({
  height: vars.sizes.small,
});

export const statusContainer = style({
  width: "100%",

  "@media": {
    [breakpoints.mobilePlus]: {
      maxWidth: "500px",
    },
  },
});

const spinAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const subdomainStatusLoading = style([
  subdomainStatusIcon,
  {
    animation: `${spinAnimation} 1s ease infinite`,
  },
]);

export const subdomainStatusOk = style([
  subdomainStatusIcon,
  {
    fill: important(vars.colors.green500),
  },
]);

export const subdomainStatusError = style([
  subdomainStatusIcon,
  {
    fill: important(vars.colors.red500),
  },
]);

export const estimateContainer = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.fontSizes.xxl,
  fontWeight: 400,
});

export const estimateSummarySeats = style({ fontWeight: 700 });
export const estimatePeriod = style({
  display: "block",
  fontSize: vars.fontSizes.small,
  textAlign: "end",
});

export const statusPageStatusIcon = style({
  height: vars.sizes.small,
});

export const statusPageLoadingIcon = style([statusPageStatusIcon, {}]);
export const statusPageCheckIcon = style([
  statusPageStatusIcon,
  {
    fill: important(vars.colors.green500),
  },
]);
