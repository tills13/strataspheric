import React from "react";

type WrapFn = (children?: React.ReactNode) => React.ReactNode;

interface Props {
  if: boolean | undefined;
  with: WrapFn;
  elseWith?: WrapFn;
}

function identityWrapper(children?: React.ReactNode) {
  return <>{children}</>;
}

export function Wrap({
  children,
  if: predicate,
  with: withFn,
  elseWith: elseFn = identityWrapper,
}: React.PropsWithChildren<Props>) {
  return predicate ? withFn(children) : elseFn(children);
}
