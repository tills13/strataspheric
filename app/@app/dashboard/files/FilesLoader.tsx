import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Bone } from "../../../../components/Skeleton/Bone";
import { Stack } from "../../../../components/Stack";
import { classnames } from "../../../../utils/classnames";

export function FilesLoader() {
  return (
    <div className={classnames(styles.filesList)}>
      <Stack>
        <div className={classnames(styles.filesListFile, s({ p: "normal" }))}>
          <Bone className={s({ mb: "small" })} />
          <Bone />
        </div>
        <div className={classnames(styles.filesListFile, s({ p: "normal" }))}>
          <Bone className={s({ mb: "small" })} />
          <Bone />
        </div>
      </Stack>
    </div>
  );
}
