import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Header } from "../../../../components/Header";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { FilesHeader } from "./FilesHeader";
import { FilesList } from "./FilesList";
import { FilesSearch } from "./FilesSearch";
import { upsertFileAction } from "./actions";

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
      <FilesHeader upsertFile={upsertFileAction.bind(undefined, undefined)} />

      <div className={styles.filesPageContainer}>
        <Suspense>
          <FilesList
            searchTerm={searchParams["search"]}
            strataId={strata.id}
            visibility={searchParams.visibility}
          />
        </Suspense>

        <div className={s({ p: "normal" })}>
          <Header className={s({ mb: "normal" })} priority={2}>
            Files Search
          </Header>
          <FilesSearch
            searchTerm={searchParams["search"]}
            visibility={searchParams["visibility"]}
          />
        </div>
      </div>
    </>
  );
}
