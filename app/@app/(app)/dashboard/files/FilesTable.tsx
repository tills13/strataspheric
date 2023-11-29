import * as iconButtonStyles from "../../../../../components/IconButton/style.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { FileLink } from "../../../../../components/FileLink";
import { DownloadIcon } from "../../../../../components/Icon/DownloadIcon";
import { IconButton } from "../../../../../components/IconButton";
import { getFiles } from "../../../../../data/files/getFiles";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { deleteFileAction } from "./actions";

interface Props {
  strataId: string;
}

export async function FilesTable({ strataId }: Props) {
  const session = await auth();
  const canDelete = can(session?.user, p("stratas", "files", "delete"));
  const files = await getFiles(strataId, canDelete);

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
