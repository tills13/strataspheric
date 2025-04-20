import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { FileLink } from "../FileLink";
import { FileTypeIcon } from "../FileTypeIcon";
import { AttachmentIcon } from "../Icon/AttachmentIcon";

interface Props {
  className?: string;
  fileName: string;
  filePath: string;
}

export function FileAttachmentChip({ className, fileName, filePath }: Props) {
  return (
    <FileLink
      className={classnames(className, styles.fileAttachmentChip)}
      path={filePath}
    >
      <FileTypeIcon
        className={styles.icon}
        defaultIcon={<AttachmentIcon className={styles.icon} />}
        filePath={filePath}
      />

      <span className={styles.name}>{fileName}</span>
    </FileLink>
  );
}
