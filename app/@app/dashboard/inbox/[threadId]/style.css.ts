import { GLOBAL_HEADER_HEIGHT_PX } from "../../../../../components/DashboardNavigation/style.css";
import { headerOffsetKeyframes } from "../../../../scrollAnimation.css";
import { breakpoints, vars } from "../../../../theme.css";
import { StyleRule, style } from "@vanilla-extract/css";

import { border, calcMinusHeaderOffset } from "../../../../../theme";

type ScrollDrivenAnimationProps = {
  animationTimeline?: string;
  animationRange?: string;
};

type ExtendedStyleRule = StyleRule & ScrollDrivenAnimationProps;

export const threadPageContainerWithChats = style({
  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateColumns: "auto 400px",
      animationName: headerOffsetKeyframes,
      animationTimingFunction: "linear",
      animationFillMode: "both",
      animationTimeline: "scroll()",
      animationRange: `0px ${GLOBAL_HEADER_HEIGHT_PX}px`,
    } as ExtendedStyleRule,
  },
});

export const inboxMessageThreadContainer = style({
  paddingBottom: vars.spacing.normal,
  overflowY: "auto",
});

export const inboxMessageThreadBackNavigationButton = style({
  marginTop: "6px",
});

export const pageHeader = style({
  borderBottom: border("1px", "solid", vars.colors.borderDefault),
});

export const outsideMessageWarning = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.red500,
  color: vars.colors.white,
});

export const chatPanelWrapper = style({
  display: "none",
  borderLeft: "1px solid " + vars.colors.borderDefault,

  "@media": {
    [breakpoints.tablet]: {
      display: "block",
      position: "sticky",
      top: 0,
      height: calcMinusHeaderOffset("100vh"),
      maxHeight: "100vh",
      overflow: "hidden",
    },
  },
});

export const mobileChatButton = style({
  position: "fixed",
  bottom: vars.spacing.normal,
  right: vars.spacing.normal,
  zIndex: 10,

  "@media": {
    [breakpoints.tablet]: {
      display: "none",
    },
  },
});

export const chatPanelContents = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  padding: vars.spacing.normal,
  height: "100%",

  "@media": {
    [breakpoints.tablet]: {
      display: "grid",
      gridTemplateRows: "1fr min-content",
    },
  },
});

export const chatPanelHeader = style({});
