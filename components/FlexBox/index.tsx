import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

interface Props extends Omit<React.ComponentProps<typeof Core<"div">>, "as"> {
  align?: keyof typeof styles.alignItems;
  gap?: keyof typeof styles.gap;
  justify?: keyof typeof styles.justifyContent;
  direction?: keyof typeof styles.direction;
}

export function FlexBox({
  align,
  className,
  children,
  direction,
  gap = "normal",
  justify,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Core
      as="div"
      className={classnames(
        className,
        styles.flexBox,
        align && styles.alignItems[align],
        gap && styles.gap[gap],
        justify && styles.justifyContent[justify],
        direction && styles.direction[direction],
      )}
      {...rest}
    >
      {children}
    </Core>
  );
}
