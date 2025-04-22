"use client";

import * as styles from "./style.css";

import { Date } from "../../../../components/Date";
import { FileLink } from "../../../../components/FileLink";
import { FilePreview } from "../../../../components/FilePreview";
import { Group } from "../../../../components/Group";
import { TextDocumentIcon } from "../../../../components/Icon/TextDocumentIcon";
import { VisibilityIcon } from "../../../../components/Icon/VisibilityIcon";
import { Panel } from "../../../../components/Panel";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";
import { Wrap } from "../../../../components/Wrap";
import { File } from "../../../../data/files/getFile";
import { p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";
import { classnames } from "../../../../utils/classnames";
import { FilesListFileActions } from "./FilesListFileActions";

interface Props extends React.ComponentProps<typeof Panel> {
  file: File | { id: string; name: string; path: string };
  showActions?: boolean;
  showImagePreview?: boolean;
}

function isFile(file: unknown): file is File {
  return (
    typeof (file as File).isPublic !== "undefined" &&
    typeof (file as File).createdAt !== "undefined"
  );
}

export function FilesListFile({
  className,
  file,
  showActions = true,
  showImagePreview,
  ...rest
}: Props) {
  const can = useCan();

  return (
    <Panel
      className={classnames(styles.filesListFile, className)}
      p="normal"
      {...rest}
    >
      <div className={styles.filesListFileIconContainer}>
        <FilePreview
          defaultIcon={<TextDocumentIcon />}
          file={file}
          showImagePreview={showImagePreview}
        />
      </div>

      <Group overflow="hidden" justify="space-between">
        <Group overflow="hidden" align="start">
          <Wrap
            if={can("stratas.files.view")}
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
                  fontSize="large"
                  fontWeight="bold"
                >
                  {file.name}
                </Text>
                {isFile(file) && file.isPublic === 1 && (
                  <VisibilityIcon
                    className={styles.filesListFileVisibilityIcon}
                  />
                )}
              </Group>
              {isFile(file) && file.createdAt && (
                <Text as="span" color="secondary" fontSize="small">
                  <Date output="date" timestamp={file.createdAt} />
                </Text>
              )}
            </Stack>
          </Wrap>
        </Group>

        {showActions &&
          can("stratas.files.edit", "stratas.files.delete") &&
          isFile(file) && <FilesListFileActions file={file} />}
      </Group>

      <div />

      {isFile(file) && (
        <Text className={styles.filesListFileDescription}>
          {file.description}
        </Text>
      )}
    </Panel>
  );
}
