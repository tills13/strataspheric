import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";
import { style } from "@vanilla-extract/css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { Date } from "../../../../../components/Date";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { FileLink } from "../../../../../components/FileLink";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Header } from "../../../../../components/Header";
import { DownloadIcon } from "../../../../../components/Icon/DownloadIcon";
import { searchFiles } from "../../../../../data/files/searchFiles";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
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
        <div
          key={file.id}
          className={classnames(styles.filesListFile, s({ p: "normal" }))}
        >
          <Header className={classnames(s({ mb: "small" }))} priority={3}>
            <FileTypeIcon
              className={styles.fileListFileIcon}
              filePath={file.path}
            />
            <FileLink path={file.path}>{file.name}</FileLink>
          </Header>
          <p>{file.description}</p>
          <div className={styles.filesListFileFooter}>
            <Date
              className={styles.filesListFileUploadDate}
              output="date"
              timestamp={file.createdAt}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // return (
  //   <table className={styles.filesList}>
  //     <thead>
  //       <tr>
  //         <th className={styles.filesTableCell}>File Name</th>
  //         <th className={styles.descriptionCell}>Description</th>
  //         <th className={styles.filesTableCell}>Upload Date</th>
  //         {canDelete && <th className={styles.filesTableCell}>Visibility</th>}
  //         <th className={styles.filesTableCell}></th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {files.length === 0 && (
  //         <tr>
  //           <td className={styles.filesTableCell} colSpan={canDelete ? 5 : 4}>
  //             {searchTerm || visibility
  //               ? "No files match your search criteria"
  //               : "No files"}
  //           </td>
  //         </tr>
  //       )}
  //       {files.map((file) => (
  //         <tr key={file.id} className={styles.filesListFile}>
  //           <td className={styles.filesTableCell}>{file.name}</td>
  //           <td className={styles.descriptionCell}>{file.description}</td>
  //           <td className={styles.filesTableCell}></td>
  //           {canDelete && (
  //             <td className={styles.filesTableCell}>
  //               {file.isPublic === 1 ? "Public" : "Private"}
  //             </td>
  //           )}
  //           <td className={styles.filesTableCell}>
  //             <div className={styles.fileActionsContainer}>
  //               {can(session?.user, p("stratas", "files", "view")) && (

  //                   <Button
  //                     icon={<DownloadIcon />}
  //                     size="small"
  //                     style="tertiary"
  //                   />
  //                 </FileLink>
  //               )}
  //               {can(session?.user, p("stratas", "files", "delete")) && (
  //
  //               )}
  //             </div>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}
