import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { Date } from "../../../../components/Date";
import { FileLink } from "../../../../components/FileLink";
import { FileTypeIcon } from "../../../../components/FileTypeIcon";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Stack } from "../../../../components/Stack";
import { searchFiles } from "../../../../data/files/searchFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { sleep } from "../../../../utils";
import { classnames } from "../../../../utils/classnames";
import { FilesListFileFooterActions } from "./FilesListFileFooterActions";
import { deleteFileAction, upsertFileAction } from "./actions";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function StrataFilesList({ searchTerm, visibility }: Props) {
  const strata = await mustGetCurrentStrata();
  const session = await auth();
  const canDelete = can(session?.user, p("stratas", "files", "delete"));
  // await sleep(2_000);
  const files = await searchFiles(strata.id, canDelete, searchTerm, visibility);

  return (
    <Stack className={classnames(styles.filesList)}>
      {files.map((file) => (
        <Group
          key={file.id}
          className={classnames(styles.filesListFile, s({ p: "normal" }))}
          align="center"
          justify="space-between"
        >
          <Group align="center">
            <Header className={styles.filesListFileHeader} priority={3}>
              <FileTypeIcon
                className={styles.fileListFileIcon}
                filePath={file.path}
              />
              {can(session?.user, p("stratas", "files", "view")) ? (
                <FileLink
                  className={styles.filesListFileHeaderName}
                  path={file.path}
                >
                  {file.name}
                </FileLink>
              ) : (
                <span className={styles.filesListFileHeaderName}>
                  {file.name}
                </span>
              )}
            </Header>
            <Date
              className={styles.filesListFileUploadDate}
              output="date"
              timestamp={file.createdAt}
            />
          </Group>
          {session?.user &&
            can(
              session.user,
              p("stratas", "files", "edit"),
              p("stratas", "files", "delete"),
            ) && (
              <FilesListFileFooterActions
                deleteFile={deleteFileAction}
                file={file}
                upsertFile={upsertFileAction}
              />
            )}
        </Group>
      ))}
    </Stack>
  );
}
