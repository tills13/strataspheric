import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";
import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

type ButtonRecipeProps = Omit<
  NonNullable<RecipeVariants<typeof styles.button>>,
  "icon"
>;

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<React.ComponentProps<typeof Core>, "as" | "color"> {
  icon?: React.ReactNode;
  iconTextBehaviour?: "centerRemainder" | "centerGlobal";
  className?: string;
  children?: React.ReactNode;
}

export function Button({
  children,
  className,
  color,
  fullWidth: propsFullWidth,
  icon,
  iconTextBehaviour = "centerGlobal",
  size = "normal",
  style,
  ...rest
}: Props & ButtonRecipeProps) {
  const mChildren = React.Children.toArray(children);

  const fullWidth =
    propsFullWidth === true ||
    (propsFullWidth === undefined && !icon && !children);

  return (
    <Core
      as="button"
      className={classnames(
        className,
        styles.button({
          color,
          fullWidth,
          size,
          style,
        }),
        !icon && styles.buttonSpacing[size],
        !!icon && styles.iconButton,
        !!icon &&
          iconTextBehaviour === "centerRemainder" &&
          styles.iconCenterRemainder,
      )}
      {...rest}
    >
      {icon && children && iconTextBehaviour !== "centerRemainder" && (
        <div className={styles.iconContainer} />
      )}

      {mChildren || icon}

      {icon && <div className={styles.iconContainer}>{icon}</div>}
    </Core>
  );
}
