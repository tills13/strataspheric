import React, { Fragment } from "react";

import { classnames } from "../../utils/classnames";

type WrapFn = (children?: React.ReactNode) => React.ReactNode;

function identityWrapper(children?: React.ReactNode) {
  return <>{children}</>;
}

interface Props {
  /** in the event Wrap is passed a className, it will pass it through to the child automatically */
  className?: string;
  if: boolean | undefined;
  with: WrapFn;
  elseWith?: WrapFn;
}

export function Wrap({
  children,
  className,
  if: predicate,
  with: withFn,
  elseWith: elseFn = identityWrapper,
}: React.PropsWithChildren<Props>) {
  const mChild = predicate ? withFn(children) : elseFn(children);

  return React.isValidElement(mChild) && mChild.type !== Fragment
    ? React.cloneElement(mChild, {
        ...mChild.props,
        className: classnames(mChild.props.className, className),
      })
    : mChild;
}
