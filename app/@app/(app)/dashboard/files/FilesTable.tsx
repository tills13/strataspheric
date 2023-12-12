import * as buttonStyles from "../../../../../components/Button/style.css";
import * as iconButtonStyles from "../../../../../components/IconButton/style.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { FileLink } from "../../../../../components/FileLink";
import { DownloadIcon } from "../../../../../components/Icon/DownloadIcon";
import { IconButton } from "../../../../../components/IconButton";
import { searchFiles } from "../../../../../data/files/searchFiles";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
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
          <th className={styles.filesTableCell}>Creation Date</th>
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
              {new Date(file.createdAt).toLocaleDateString()}
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
                    <IconButton
                      className={classnames(
                        iconButtonStyles.iconButton,
                        iconButtonStyles.iconButtonSizes.small,
                        buttonStyles.buttonVariants.tertiary,
                      )}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </FileLink>
                )}
                {can(session?.user, p("stratas", "files", "delete")) && (
                  <DeleteButton
                    onClick={deleteFileAction.bind(undefined, file.id)}
                    className={classnames(
                      iconButtonStyles.iconButton,
                      iconButtonStyles.iconButtonSizes.small,
                      buttonStyles.buttonVariants.tertiary,
                    )}
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
