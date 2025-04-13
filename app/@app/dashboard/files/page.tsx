import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { PageProps } from "../../../../.next/types/app/@app/dashboard/files/page";
import { auth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { DropdownButton } from "../../../../components/DropdownButton";
import { FlexBox } from "../../../../components/FlexBox";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { SearchIcon } from "../../../../components/Icon/SearchIcon";
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
          <Header as="h2">Files</Header>

          <Group>
            <DropdownButton
              buttonColor="primary"
              buttonStyle="primary"
              icon={<SearchIcon />}
              openLabel="File Search"
              panel={
                <FlexBox p="normal">
                  <FilesSearch
                    className={s({ w: "full" })}
                    searchTerm={search}
                    visibility={visibility}
                  />
                </FlexBox>
              }
            />
            {can(session?.user, "stratas.files.create") && (
              <AddFileButton
                upsertFile={upsertFileAction.bind(undefined, undefined)}
              />
            )}
          </Group>
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
