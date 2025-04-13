import { S, s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { JSX } from "react";

import { classnames } from "../../utils/classnames";

interface BaseProps<E extends keyof JSX.IntrinsicElements> extends S {
  as: E;
  className?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  visibleFrom?: keyof typeof styles.coreVisibleFrom;
  visibleOn?: keyof typeof styles.coreVisibleOn;
}

export type Props<E extends keyof JSX.IntrinsicElements> = BaseProps<E> &
  JSX.IntrinsicElements[E];

export function Core<E extends keyof JSX.IntrinsicElements = "div">({
  as: IsomorphicComponent,
  className,
  children,
  id,
  ref,
  visibleFrom,
  visibleOn,
  ...rest
}: React.PropsWithChildren<Props<E>>) {
  const { sprinkleAttrs, props } = Object.entries(rest).reduce(
    (acc, [propName, propValue]) => {
      if (s.properties.has(propName)) {
        acc.sprinkleAttrs[propName as keyof S] = propValue;
      } else {
        acc.props[propName as keyof JSX.IntrinsicElements[E]] = propValue;
      }

      return acc;
    },
    {
      sprinkleAttrs: {} as S,
      props: {} as JSX.IntrinsicElements[E],
    },
  );

  // @ts-ignore
  return (
    <IsomorphicComponent
      className={classnames(
        className,
        styles.core,
        visibleFrom && styles.coreVisibleFrom[visibleFrom],
        visibleOn && styles.coreVisibleOn[visibleOn],
        s(sprinkleAttrs),
      )}
      id={id}
      ref={ref}
      {...props}
    >
      {children}
    </IsomorphicComponent>
  );
}
