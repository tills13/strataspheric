import * as styles from "./style.css";
import React from "react";
import { classnames } from "../../utils/classnames";
import { vars } from "../../app/theme.css";

interface BaseProps {
  className?: string;
  children: React.ReactNode;
  divider?: React.ReactNode;
  equalWidthChildren?: boolean;
  gap?: keyof typeof vars.spacing;
  tabIndex?: number;
  orientation?: "row" | "column";
  wrap?: boolean;
}

interface AlignProps extends BaseProps {
  /** alignment on the x-axis, irrespective of `vertical` */
  xAlign?: "start" | "end" | "initial";
  /** alignment on the y-axis, irrespective of `vertical` */
  yAlign?: "start" | "center" | "end" | "initial";
}

interface SpacingProps extends BaseProps {
  spaceBetween: boolean;
}

type Props = AlignProps | SpacingProps;

export function ElementGroup(props: Props) {
  const {
    className,
    children,
    divider,
    gap = "normal",
    tabIndex,
    orientation = "row",
  } = props;
  const numChildren = React.Children.count(children);

  const classNames: string[] = [
    styles.elementGroupOrientation[orientation],
    styles.elementGroupGap[gap],
  ];

  const xAlign =
    ((props as SpacingProps).spaceBetween
      ? "spaceBetween"
      : (props as AlignProps).xAlign) || "start";

  classNames.push(styles.horizontalAlignment[xAlign]);

  if ((props as AlignProps).yAlign) {
    classNames.push(styles.verticalAlignment[(props as AlignProps).yAlign!]);
  }

  return (
    <div className={classnames(...classNames, className)} tabIndex={tabIndex}>
      {React.Children.map(children, (c, i) => (
        <>
          {c}
          {i !== numChildren - 1 && divider}
        </>
      ))}
    </div>
  );
}
