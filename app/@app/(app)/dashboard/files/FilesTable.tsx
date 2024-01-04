import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { FileLink } from "../../../../../components/FileLink";
import { DownloadIcon } from "../../../../../components/Icon/DownloadIcon";
import { searchFiles } from "../../../../../data/files/searchFiles";
import { can, p } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import { deleteFileAction } from "./actions";

interface Props {
  strataId: string;
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function FilesTable({ searchTerm, strataId, visibility }: Props) {
  const session = await auth();
  const canDelete = can(session?.user, p("stratas", "files", "delete"));
  const files = await searchFiles(strataId, canDelete, searchTerm, visibility);

  return (
    <table className={styles.filesTable}>
      <thead>
        <tr>
          <th className={styles.filesTableCell}>File Name</th>
          <th className={styles.descriptionCell}>Description</th>
          <th className={styles.filesTableCell}>Upload Date</th>
          {canDelete && <th className={styles.filesTableCell}>Visibility</th>}
          <th className={styles.filesTableCell}></th>
        </tr>
      </thead>
      <tbody>
        {files.length === 0 && (
          <tr>
            <td className={styles.filesTableCell} colSpan={canDelete ? 5 : 4}>
              {searchTerm || visibility
                ? "No files match your search criteria"
                : "No files"}
            </td>
          </tr>
        )}
        {files.map((file) => (
          <tr key={file.id} className={styles.filesTableRow}>
            <td className={styles.filesTableCell}>{file.name}</td>
            <td className={styles.descriptionCell}>{file.description}</td>
            <td className={styles.filesTableCell}>
              {parseTimestamp(file.createdAt).toLocaleDateString()}
            </td>
            {canDelete && (
              <td className={styles.filesTableCell}>
                {file.isPublic === 1 ? "Public" : "Private"}
              </td>
            )}
            <td className={styles.filesTableCell}>
              <div className={styles.fileActionsContainer}>
                {can(session?.user, p("stratas", "files", "view")) && (
                  <FileLink path={file.path}>
                    <Button
                      icon={<DownloadIcon />}
                      size="small"
                      style="tertiary"
                    />
                  </FileLink>
                )}
                {can(session?.user, p("stratas", "files", "delete")) && (
                  <DeleteButton
                    onClick={deleteFileAction.bind(undefined, file.id)}
                    color="error"
                    size="small"
                    style="tertiary"
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
