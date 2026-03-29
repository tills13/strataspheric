import * as styles from "./style.css";

import { Group } from "../Group";
import { Text } from "../Text";

interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
}

export function DetailsRow({ description, title }: Props) {
  return (
    <Group gap="normal" minh="small">
      <dt>
        <Text fontWeight="bold" whiteSpace="nowrap">
          {title}
        </Text>
      </dt>
      <div className={styles.detailsRowSpacer} />
      <dd>{description}</dd>
    </Group>
  );
}
