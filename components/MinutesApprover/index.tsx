import * as styles from "./style.css";

import { Group } from "../Group";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { Text } from "../Text";

interface Props {
  className?: string;
  approverName: string;
}

export function MinutesApprover({ approverName, className }: Props) {
  return (
    <Group className={className} as="span" whiteSpace="nowrap" gap="small">
      <CircleCheckIcon className={styles.minutesApproverIcon} />
      <Text as="span">Approved by {approverName}</Text>
    </Group>
  );
}
