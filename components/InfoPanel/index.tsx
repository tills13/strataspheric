import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";

interface Props extends NonNullable<RecipeVariants<typeof styles.infoPanel>> {}

export function InfoPanel({
  children,
  ...recipeProps
}: React.PropsWithChildren<Props>) {
  return <div className={styles.infoPanel(recipeProps)}>{children}</div>;
}
