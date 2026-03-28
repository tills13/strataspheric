import React, { Fragment } from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";

type WrapFn = (children?: React.ReactNode) => React.ReactNode;

interface IfProps {
  /** in the event Wrap is passed a className, it will pass it through to the child automatically */
  className?: string;
  if: boolean | undefined;
  with: WrapFn;
}

type PredicateMatcher<V = unknown> = [
  V,
  (v: V, children: React.ReactNode) => React.ReactNode,
];

interface MatchProps {
  className?: string;
  predicate: unknown;
  match: Array<PredicateMatcher>;
}

type Props = IfProps | MatchProps;

export function Wrap(props: React.PropsWithChildren<Props>) {
  const { className, children } = props;
  let child = children;

  if ("match" in props) {
    const { match, predicate } = props;
    const f = match.find(([matcher]) => matcher === predicate);

    if (f) {
      child = f[1](predicate, children);
    }
  } else {
    const { if: predicate, with: withFn } = props;
    child =
      typeof predicate === "undefined" || predicate === true
        ? withFn(children)
        : children;
  }

  if (!reactNodeCanReceiveClassNameProp(child) || child.type === Fragment) {
    return child;
  }

  return React.cloneElement(child, {
    className: classnames(child.props.className, className),
  });
}
