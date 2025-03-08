"use client";

import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Date } from "../../../../components/Date";
import { FileLink } from "../../../../components/FileLink";
import { FileTypeIcon } from "../../../../components/FileTypeIcon";
import { Group } from "../../../../components/Group";
import { VisibilityIcon } from "../../../../components/Icon/VisibilityIcon";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";
import { Wrap } from "../../../../components/Wrap";
import { File } from "../../../../data";
import { p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";
import { classnames } from "../../../../utils/classnames";
import { FilesListFileActions } from "./FilesListFileActions";

interface Props {
  className?: string;
  deleteFileAction: (fileId: string) => Promise<void>;
  file: File;
  upsertFileAction: (fileId: string, fd: FormData) => Promise<any>;
}

export function FilesListFile({
  className,
  deleteFileAction,
  file,
  upsertFileAction,
}: Props) {
  const can = useCan();

  return (
    <Stack
      className={classnames(
        styles.filesListFile,
        s({ p: "normal" }),
        className,
      )}
    >
      <Group className={styles.filesListDetails} justify="space-between">
        <Group>
          <FileTypeIcon
            className={styles.fileListFileIcon}
            filePath={file.path}
          />

          <Wrap
            if={can(p("stratas", "files", "view"))}
            with={(children) => (
              <FileLink className={styles.fileListLink} path={file.path}>
                {children}
              </FileLink>
            )}
          >
            <span className={styles.filesListFileHeaderName}>{file.name}</span>
          </Wrap>
        </Group>

        <Group gap="small">
          <Date
            className={styles.filesListFileUploadDate}
            output="date"
            timestamp={file.createdAt}
          />

          {!file.isPublic && (
            <VisibilityIcon className={styles.filesListFileVisibilityIcon} />
          )}

          {can(
            p("stratas", "files", "edit"),
            p("stratas", "files", "delete"),
          ) && (
            <FilesListFileActions
              deleteFile={deleteFileAction}
              file={file}
              upsertFile={upsertFileAction}
            />
          )}
        </Group>
      </Group>

      {file.description && (
        <Text className={styles.filesListFileDescription}>
          {file.description}
        </Text>
      )}
    </Stack>
  );
}
