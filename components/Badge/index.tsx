import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";

import { classnames } from "../../utils/classnames";

interface Props extends NonNullable<RecipeVariants<typeof styles.badge>> {
  className?: string;
}

export function Badge({
  children,
  className,
  level,
}: React.PropsWithChildren<Props>) {
  return (
    <span className={classnames(styles.badge({ level }), className)}>
      {children}
    </span>
  );
}
