import React from "react";

export function reactNodeCanReceiveClassNameProp(
  e: React.ReactNode,
): e is React.ReactElement<Record<string, unknown>> {
  return (
    React.isValidElement(e) &&
    typeof e.props === "object" &&
    e.props !== null &&
    e.type !== React.Fragment
  );
}
