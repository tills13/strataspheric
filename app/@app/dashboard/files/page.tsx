import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { can, p } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { AddFileButton } from "./AddFileButton";
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
  const session = await auth();

  return (
    <>
      <DashboardHeader />

      <div>
        <Group className={s({ p: "normal" })} justify="space-between">
          <Header priority={2}>Files</Header>

          {can(session?.user, p("stratas", "files", "create")) && (
            <div>
              <AddFileButton
                upsertFile={upsertFileAction.bind(undefined, undefined)}
              />
            </div>
          )}
        </Group>
        <div
          className={classnames(
            styles.filesPageContainer,
            s({ ph: "normal", pb: "normal" }),
          )}
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
      </div>
    </>
  );
}
