import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

type CoreProps = React.ComponentProps<typeof Core<"div" | "span" | "dl">>;

interface Props
  extends Omit<
    CoreProps,
    "as" | "alignItems" | "justifyContent" | "flexDirection" | "flexWrap"
  > {
  as?: CoreProps["as"];
  align?: CoreProps["alignItems"];
  justify?: CoreProps["justifyContent"];
  direction?: CoreProps["flexDirection"];
  wrap?: CoreProps["flexWrap"];
}

export function FlexBox({
  align,
  className,
  children,
  direction,
  gap = "normal",
  justify,
  wrap,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Core
      as="div"
      className={classnames(className, styles.flexBox)}
      alignItems={align}
      flexDirection={direction}
      flexWrap={wrap}
      gap={gap}
      justifyContent={justify}
      {...rest}
    >
      {children}
    </Core>
  );
}
