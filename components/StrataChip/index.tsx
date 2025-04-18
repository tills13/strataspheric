import * as styles from "./style.css";

import { Strata } from "../../data";
import { Group } from "../Group";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  strata: Strata;
}

export function StrataChip({ strata }: Props) {
  return (
    <div className={styles.strataChip}>
      <Group justify="space-between">
        <Stack gap="xxs">
          <Text color="primary" fontSize="large" fontWeight="bold">
            {strata.name}
          </Text>

          <Text color="secondary" fontSize="small">
            {strata.domain}
          </Text>
        </Stack>
        <ArrowForwardIcon size="small" />
      </Group>
    </div>
  );
}
