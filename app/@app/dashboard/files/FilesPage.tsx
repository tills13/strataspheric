import { s } from "../../../../sprinkles.css";

import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { DropdownButton } from "../../../../components/DropdownButton";
import { FlexBox } from "../../../../components/FlexBox";
import { Group } from "../../../../components/Group";
import { SearchIcon } from "../../../../components/Icon/SearchIcon";
import { can } from "../../../../data/users/permissions";
import { AddFileButton } from "./AddFileButton";
import { FilesSearch } from "./FilesSearch";
import { StrataFilesList } from "./StrataFilesList";

interface Props {
  search?: string;
  visibility?: "public" | "private";
}

export async function FilesPage({ search, visibility }: Props) {
  const session = await mustAuth();

  return (
    <DashboardLayout
      actions={
        <Group gap="small">
          <DropdownButton
            buttonColor="primary"
            buttonStyle="tertiary"
            icon={<SearchIcon />}
            panel={
              <FlexBox p="normal">
                <FilesSearch
                  className={s({ w: "full" })}
                  searchTerm={search}
                  visibility={visibility}
                />
              </FlexBox>
            }
            buttonSize="small"
          />
          {can(session.user, "stratas.files.create") && <AddFileButton />}
        </Group>
      }
      title="Files"
    >
      <StrataFilesList searchTerm={search} visibility={visibility} />
    </DashboardLayout>
  );
}
