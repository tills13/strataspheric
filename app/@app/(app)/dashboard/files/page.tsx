import * as styles from "./style.css";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TableSkeleton } from "../../../../../components/Skeleton/TableSkeleton";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { FilesHeader } from "./FilesHeader";
import { FilesSearch } from "./FilesSearch";
import { FilesTable } from "./FilesTable";
import { createFileAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string; visibility?: "private" | "public" };
}) {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <>
      <FilesHeader createFile={createFileAction.bind(undefined, strata.id)} />
      <div>
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
            <FilesTable
              searchTerm={searchParams["search"]}
              strataId={strata.id}
              visibility={searchParams.visibility}
            />
          </Suspense>
        </div>
        <FilesSearch
          searchTerm={searchParams["search"]}
          visibility={searchParams["visibility"]}
        />
      </div>
    </>
  );
}
