import { S, s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props extends S {
  align?: keyof typeof styles.alignItems;
  className?: string;
  gap?: keyof typeof styles.gap;
  id?: string;
  justify?: keyof typeof styles.justifyContent;
  ref?: React.Ref<HTMLDivElement>;
}

export function Box({
  align,
  className,
  children,
  gap = "normal",
  id,
  justify,
  ref,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={classnames(
        className,
        styles.box,
        align && styles.alignItems[align],
        gap && styles.gap[gap],
        justify && styles.justifyContent[justify],
        s(rest),
      )}
      id={id}
      ref={ref}
    >
      {children}
    </div>
  );
}
