import { s } from "../../../../sprinkles.css";

import { Suspense } from "react";

import { mustAuth } from "../../../../auth";
import { DropdownButton } from "../../../../components/DropdownButton";
import { FlexBox } from "../../../../components/FlexBox";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { SearchIcon } from "../../../../components/Icon/SearchIcon";
import { can, p } from "../../../../data/users/permissions";
import { AddFileButton } from "./AddFileButton";
import { FilesLoader } from "./FilesLoader";
import { FilesSearch } from "./FilesSearch";
import { StrataFilesList } from "./StrataFilesList";
import { upsertFileAction } from "./actions";

interface Props {
  search?: string;
  visibility?: "public" | "private";
}

export async function FilesPage({ search, visibility }: Props) {
  const session = await mustAuth();

  return (
    <div>
      <Group justify="space-between" p="normal">
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
          {can(session.user, "stratas.files.create") && <AddFileButton />}
        </Group>
      </Group>

      <Suspense fallback={<FilesLoader />}>
        <div className={s({ ph: "normal" })}>
          <StrataFilesList searchTerm={search} visibility={visibility} />
        </div>
      </Suspense>
    </div>
  );
}
