import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { PageProps } from "../../../../.next/types/app/@app/dashboard/files/page";
import { auth } from "../../../../auth";
import { Box } from "../../../../components/Box";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { DropdownButton } from "../../../../components/DropdownButton";
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
            <Group>
              <DropdownButton
                panel={
                  <Box
                    className={classnames(styles.filesSearchPanel)}
                    p="normal"
                  >
                    <FilesSearch
                      className={s({ w: "full" })}
                      searchTerm={search}
                      visibility={visibility}
                    />
                  </Box>
                }
              />
              <AddFileButton
                upsertFile={upsertFileAction.bind(undefined, undefined)}
              />
            </Group>
          )}
        </Group>

        <Suspense fallback={<FilesLoader />}>
          <div className={s({ ph: "normal" })}>
            <StrataFilesList searchTerm={search} visibility={visibility} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
