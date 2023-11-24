import * as styles from "./style.css";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TableSkeleton } from "../../../../../components/Skeleton/TableSkeleton";
import { getCurrentStrata } from "../../../../../db/stratas/getStrata";
import { FilesHeader } from "./FilesHeader";
import { FilesTable } from "./FilesTable";
import { createFileAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <>
      <FilesHeader createFile={createFileAction.bind(undefined, strata.id)} />
      <div className={styles.filesTableContainer}>
        <Suspense
          fallback={
            <TableSkeleton
              cellClassName={styles.filesTableCell}
              columns={1}
              rows={5}
            />
          }
        >
          <FilesTable strataId={strata.id} />
        </Suspense>
      </div>
    </>
  );
}
