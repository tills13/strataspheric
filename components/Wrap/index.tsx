import React, { Fragment } from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";

type WrapFn = (children?: React.ReactNode) => React.ReactNode;

interface Props {
  /** in the event Wrap is passed a className, it will pass it through to the child automatically */
  className?: string;
  if?: boolean | undefined;
  with: WrapFn;
}

export function Wrap({
  children,
  className,
  if: predicate,
  with: withFn,
}: React.PropsWithChildren<Props>) {
  const mChild =
    typeof predicate === "undefined" || predicate === true
      ? withFn(children)
      : children;

  if (!reactNodeCanReceiveClassNameProp(mChild) || mChild.type === Fragment) {
    return mChild;
  }

  return React.cloneElement(mChild, {
    className: classnames(
      typeof mChild.props.className === "string"
        ? mChild.props.className
        : undefined,
      className,
    ),
  });
}
