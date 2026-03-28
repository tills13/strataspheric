import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { FileLink } from "../FileLink";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { Wrap } from "../Wrap";

interface Props {
  className?: string;
  fileName: string;
  filePath: string;
  linked?: boolean;
}

function FileAttachmentChipInner({
  className,
  children,
}: {
  className: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <Group
      className={classnames(className, styles.fileAttachmentChip)}
      gap="small"
      ph="small"
      align="center"
    >
      {children}
    </Group>
  );
}

export function FileAttachmentChip({
  className,
  fileName,
  filePath,
  linked = false,
}: Props) {
  return (
    <Wrap
      predicate={linked}
      match={[
        [
          false,
          (_, children) => (
            <FileAttachmentChipInner className={className}>
              {children}
            </FileAttachmentChipInner>
          ),
        ],
        [
          true,
          (_, children) => (
            <FileLink path={filePath}>
              <FileAttachmentChipInner className={className}>
                {children}
              </FileAttachmentChipInner>
            </FileLink>
          ),
        ],
      ]}
    >
      <FileTypeIcon
        className={styles.icon}
        defaultIcon={<AttachmentIcon className={styles.icon} />}
        filePath={filePath}
      />

      <span className={styles.name}>{fileName}</span>
    </Wrap>
  );
}
