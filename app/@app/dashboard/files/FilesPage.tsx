import { s } from "../../../../sprinkles.css";

import { mustAuth } from "../../../../auth";
import { BulkFileActions } from "../../../../components/BulkFileActions";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { DropdownButton } from "../../../../components/DropdownButton";
import { FlexBox } from "../../../../components/FlexBox";
import { Group } from "../../../../components/Group";
import { SearchIcon } from "../../../../components/Icon/SearchIcon";
import { SelectAllCheckbox } from "../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../components/Table/TableSelectProvider";
import { listFiles } from "../../../../data/files/listFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { AddFileButton } from "./AddFileButton";
import { FilesSearch } from "./FilesSearch";
import { StrataFilesList } from "./StrataFilesList";

interface Props {
  search?: string;
  visibility?: "public" | "private";
}

export async function FilesPage({ search, visibility }: Props) {
  const [session, strata] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
  ]);

  const canEdit = can(session.user, "stratas.files.edit");
  const canDelete = can(session.user, "stratas.files.delete");

  const files = await listFiles(
    {
      strataId: strata.id,
      isPublic:
        !canDelete ||
        (typeof visibility === "undefined"
          ? undefined
          : visibility === "public"),
      ...(!canDelete && { userId: session.user.id }),
      ...(search && { searchTerm: search }),
    },
    {
      orderBy: "createdAt desc",
    },
  );

  const fileVisibility = Object.fromEntries(
    files.map((f) => [f.id, f.isPublic === 1]),
  );

  return (
    <TableSelectProvider>
      <DashboardLayout
        actions={
          <Group gap="small">
            {canEdit && <BulkFileActions fileVisibility={fileVisibility} />}
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
        selectAll={<SelectAllCheckbox rowIds={files.map((f) => f.id)} />}
        title="Files"
      >
        <StrataFilesList files={files} />
      </DashboardLayout>
    </TableSelectProvider>
  );
}
