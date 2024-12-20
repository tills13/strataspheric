import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";

import { classnames } from "../../utils/classnames";

interface Props extends NonNullable<RecipeVariants<typeof styles.infoPanel>> {
  className?: string;
}

export function InfoPanel({
  children,
  className,
  ...recipeProps
}: React.PropsWithChildren<Props>) {
  return (
    <div className={classnames(className, styles.infoPanel(recipeProps))}>
      {children}
    </div>
  );
}
