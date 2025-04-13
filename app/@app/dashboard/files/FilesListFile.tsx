"use client";

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
  deleteFileAction?: (fileId: string) => Promise<void>;
  file: File;
  upsertFileAction?: (fileId: string, fd: FormData) => Promise<any>;
}

export function FilesListFile({
  className,
  deleteFileAction,
  file,
  upsertFileAction,
}: Props) {
  const can = useCan();

  return (
    <Stack className={classnames(styles.filesListFile, className)} p="normal">
      <Group justify="space-between">
        <Group overflow="hidden" align="start">
          <FileTypeIcon
            className={styles.fileListFileIcon}
            filePath={file.path}
          />

          <Wrap
            if={can(p("stratas", "files", "view"))}
            with={(children) => (
              <FileLink
                className={styles.fileListLink}
                path={file.path}
                noUnderline
              >
                {children}
              </FileLink>
            )}
          >
            <Stack gap="xxs">
              <Group>
                <Text
                  as="span"
                  color="primary"
                  className={styles.filesListFileHeaderName}
                  size="large"
                  weight="bold"
                >
                  {file.name}
                </Text>
                {file.isPublic === 1 && (
                  <VisibilityIcon
                    className={styles.filesListFileVisibilityIcon}
                  />
                )}
              </Group>
              <Text as="span" color="secondary" size="small">
                <Date output="date" timestamp={file.createdAt} />
              </Text>
            </Stack>
          </Wrap>
        </Group>

        {can(p("stratas", "files", "edit"), p("stratas", "files", "delete")) &&
          deleteFileAction &&
          upsertFileAction && (
            <FilesListFileActions
              deleteFile={deleteFileAction}
              file={file}
              upsertFile={upsertFileAction}
            />
          )}
      </Group>

      {file.description && (
        <Text className={styles.filesListFileDescription}>
          {file.description}
        </Text>
      )}
    </Stack>
  );
}
