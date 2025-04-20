import * as styles from "./style.css";

import { RecipeVariants } from "@vanilla-extract/recipes";

import { classnames } from "../../utils/classnames";
import { Stack } from "../Stack";

interface Props
  extends NonNullable<RecipeVariants<typeof styles.infoPanel>>,
    React.ComponentProps<typeof Stack> {
  action?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}

export function InfoPanel({
  action,
  alignment,
  children,
  className,
  header,
  level,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Stack
      className={classnames(className, styles.infoPanel({ alignment, level }))}
      {...rest}
    >
      {header}
      {children}
      {action}
    </Stack>
  );
}
