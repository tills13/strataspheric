import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";
import React from "react";

import { classnames } from "../../utils/classnames";
import { Text } from "../Text";

interface Props
  extends NonNullable<RecipeVariants<typeof styles.badge>>,
    Omit<React.ComponentProps<typeof Text>, "as" | "noLineHeight"> {
  className?: string;
}

export function Badge({
  children,
  className,
  fontWeight: propsFontWeight,
  fw: propsFontWeightShort,
  level,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Text
      as="span"
      className={classnames(styles.badge({ level }), className)}
      fw={propsFontWeight || propsFontWeightShort || "bold"}
      color="unset"
      noLineHeight
      {...rest}
    >
      {children}
    </Text>
  );
}
