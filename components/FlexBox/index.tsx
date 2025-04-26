import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

type CoreProps = React.ComponentProps<typeof Core<"div">>;

interface Props
  extends Omit<
    CoreProps,
    "as" | "alignItems" | "justifyContent" | "flexDirection"
  > {
  align?: CoreProps["alignItems"];
  justify?: CoreProps["justifyContent"];
  direction?: CoreProps["flexDirection"];
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
      className={classnames(className, styles.flexBox)}
      alignItems={align}
      flexDirection={direction}
      gap={gap}
      justifyContent={justify}
      {...rest}
    >
      {children}
    </Core>
  );
}
