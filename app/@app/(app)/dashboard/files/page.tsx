import * as styles from "./style.css";

import { notFound } from "next/navigation";

import { DownloadIcon } from "../../../../../components/Icon/DownloadIcon";
import { IconButton } from "../../../../../components/IconButton";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { getFiles } from "../../../../../db/files/getFiles";
import { getCurrentStrata } from "../../../../../db/stratas/getStrata";
import { FilesHeader } from "./FilesHeader";
import { createFileAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const files = await getFiles(strata.id);

  return (
    <>
      <FilesHeader createFile={createFileAction.bind(undefined, strata.id)} />
      <div className={styles.filesTableContainer}>
        <table className={styles.filesTable}>
          <thead>
            <tr>
              <th className={styles.filesTableCell}>File Name</th>
              <th className={styles.descriptionCell}>Description</th>
              <th className={styles.filesTableCell}>Creation Date</th>
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
                <td className={styles.filesTableCell}>
                  <ExternalLink target="_blank" href={file.path}>
                    <IconButton size="small">
                      <DownloadIcon />
                    </IconButton>
                  </ExternalLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
