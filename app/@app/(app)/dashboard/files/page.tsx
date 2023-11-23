import * as styles from "./style.css";

import { notFound } from "next/navigation";

import { getFiles } from "../../../../../db/files/getFiles";
import { getCurrentStrata } from "../../../../../db/stratas/getStrata";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const files = await getFiles(strata.id);

  return (
    <div>
      <table className={styles.filesTable}>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className={styles.filesTableRow}>
              <td className={styles.filesTableCell}>{file.id}</td>
              <td className={styles.filesTableCell}>{file.description}</td>
              <td className={styles.filesTableCell}>
                {new Date(file.createdAt).toLocaleDateString()}
              </td>
              <td className={styles.filesTableCell}>Download</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
