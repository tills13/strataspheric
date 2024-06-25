import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { Date } from "../../../../components/Date";
import { FileLink } from "../../../../components/FileLink";
import { FileTypeIcon } from "../../../../components/FileTypeIcon";
import { Header } from "../../../../components/Header";
import { searchFiles } from "../../../../data/files/searchFiles";
import { can, p } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { upsertFileAction } from "../actions";
import { FilesListFileFooterActions } from "./FilesListFileFooterActions";
import { deleteFileAction } from "./actions";

interface Props {
  strataId: string;
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function FilesList({ searchTerm, strataId, visibility }: Props) {
  const session = await auth();
  const canDelete = can(session?.user, p("stratas", "files", "delete"));
  const files = await searchFiles(strataId, canDelete, searchTerm, visibility);

  return (
    <div className={classnames(styles.filesList, s({ p: "normal" }))}>
      {files.map((file) => (
        <div key={file.id} className={styles.filesListFileContainer}>
          <div className={classnames(styles.filesListFile, s({ p: "normal" }))}>
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
              <Date
                className={styles.filesListFileUploadDate}
                output="date"
                timestamp={file.createdAt}
              />
            </Header>
            {file.description && (
              <p className={classnames(s({ mt: "small" }))}>
                {file.description}
              </p>
            )}
          </div>
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
        </div>
      ))}
    </div>
  );
}
