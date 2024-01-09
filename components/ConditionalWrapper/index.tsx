import React from "react";

type WrapFn = (children?: React.ReactNode) => React.ReactNode;

interface Props {
  predicate: boolean | undefined;
  wrapTrue: WrapFn;
  wrapFalse?: WrapFn;
}

function identityWrapper(children?: React.ReactNode) {
  return <>{children}</>;
}

export function ConditionalWrapper({
  children,
  predicate,
  wrapTrue,
  wrapFalse = identityWrapper,
}: React.PropsWithChildren<Props>) {
  return predicate ? wrapTrue(children) : wrapFalse(children);
}
