import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { Logo } from "../Logo";
import { Text } from "../Text";

interface Props {
  className?: string;
}

export function Wordmark({ className }: Props) {
  return (
    <Group gap="small" className={classnames(styles.wordmark, className)}>
      <Logo className={styles.wordmarkLogo} />
      <Text as="span" className={styles.wordmarkText} color="unset">
        Strataspheric
      </Text>
    </Group>
  );
}
