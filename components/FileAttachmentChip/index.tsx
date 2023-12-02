import * as styles from "./style.css";

import React from "react";

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
    <FileLink className={className || styles.file} path={filePath}>
      <FileTypeIcon
        className={styles.icon}
        defaultIcon={<AttachmentIcon className={styles.icon} />}
        filePath={filePath}
      />

      {fileName}
    </FileLink>
  );
}
