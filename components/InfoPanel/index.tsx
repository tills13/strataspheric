import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";

import { classnames } from "../../utils/classnames";
import { Stack } from "../Stack";

interface Props extends NonNullable<RecipeVariants<typeof styles.infoPanel>> {
  action?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}

export function InfoPanel({
  action,
  children,
  className,
  header,
  ...recipeProps
}: React.PropsWithChildren<Props>) {
  return (
    <Stack className={classnames(className, styles.infoPanel(recipeProps))}>
      {header}
      {children}
      {action}
    </Stack>
  );
}
