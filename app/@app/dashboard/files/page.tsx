import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { Header } from "../../../../components/Header";
import { Bone } from "../../../../components/Skeleton/Bone";
import { classnames } from "../../../../utils/classnames";
import { FilesHeader } from "./FilesHeader";
import { FilesLoader } from "./FilesLoader";
import { FilesSearch } from "./FilesSearch";
import { StrataFilesList } from "./StrataFilesList";
import { upsertFileAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string; visibility?: "private" | "public" };
}) {
  return (
    <>
      <FilesHeader upsertFile={upsertFileAction.bind(undefined, undefined)} />

      <div
        className={classnames(styles.filesPageContainer, s({ p: "normal" }))}
      >
        <Suspense fallback={<FilesLoader />}>
          <StrataFilesList
            searchTerm={searchParams["search"]}
            visibility={searchParams.visibility}
          />
        </Suspense>

        <div>
          <Header className={s({ mb: "large" })} priority={2}>
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
