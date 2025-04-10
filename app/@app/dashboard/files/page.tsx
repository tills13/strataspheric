import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { PageProps } from "../../../../.next/types/app/@app/dashboard/files/page";
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

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  const { search, visibility } = await searchParams;

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
            <StrataFilesList searchTerm={search} visibility={visibility} />
          </Suspense>

          <div>
            <Header className={s({ mb: "large" })} priority={2}>
              Files Search
            </Header>
            <FilesSearch searchTerm={search} visibility={visibility} />
          </div>
        </div>
      </div>
    </>
  );
}
