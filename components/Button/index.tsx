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
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
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
  iconLeft,
  iconRight,
  size,
  style,
  ...rest
}: Props & ButtonRecipeProps) {
  const iconOnly = !!icon;
  const withIcon = !!iconLeft || !!iconRight;

  const fullWidth =
    propsFullWidth === true || (propsFullWidth === undefined && !iconOnly);

  return (
    <Core
      as="button"
      className={classnames(
        className,
        styles.button({
          color,
          fullWidth,
          size,
          iconOnly,
          style,
          withIcon,
        }),
      )}
      {...rest}
    >
      {((withIcon && iconTextBehaviour !== "centerRemainder") || iconLeft) && (
        <div
          className={
            iconLeft ? styles.iconContainer : styles.emptyIconContainer
          }
        >
          {iconLeft}
        </div>
      )}

      <div
        className={classnames(styles.buttonContentContainer, {
          [styles.remainderPaddingLeft]:
            !iconLeft && withIcon && iconTextBehaviour === "centerRemainder",
          [styles.remainderPaddingRight]:
            !iconRight && withIcon && iconTextBehaviour === "centerRemainder",
        })}
      >
        {children || icon}
      </div>

      {((withIcon && iconTextBehaviour !== "centerRemainder") || iconRight) && (
        <div
          className={
            iconRight ? styles.iconContainer : styles.emptyIconContainer
          }
        >
          {iconRight}
        </div>
      )}
    </Core>
  );
}
