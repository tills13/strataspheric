import * as styles from "./styles.css";

import { Panel } from "../../../../components/Panel";
import { Bone } from "../../../../components/Skeleton/Bone";
import { Stack } from "../../../../components/Stack";
import { range } from "../../../../utils/arrays";

export function MembershipsLoader() {
  return (
    <div className={styles.membershipGrid}>
      {[...range(3)].map((i) => (
        <Panel key={i}>
          <Stack>
            <Stack gap="xs">
              <Bone />
              <Bone style={{ maxWidth: 80 }} inline />
            </Stack>
            <Stack gap="small">
              <Bone />
              <Bone />
              <Bone />
            </Stack>
          </Stack>
        </Panel>
      ))}
    </div>
  );
}
