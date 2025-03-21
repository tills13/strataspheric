import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { InfoPanel } from "../../../../components/InfoPanel";
import { Stack } from "../../../../components/Stack";
import { searchFiles } from "../../../../data/files/searchFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { FilesListFile } from "./FilesListFile";
import { deleteFileAction, upsertFileAction } from "./actions";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function StrataFilesList({ searchTerm, visibility }: Props) {
  const strata = await mustGetCurrentStrata();
  const session = await auth();
  const canDelete = can(session?.user, p("stratas", "files", "delete"));

  const files = await searchFiles(strata.id, canDelete, searchTerm, visibility);

  return (
    <Stack className={classnames(styles.filesList)}>
      {(searchTerm || visibility) && files.length === 0 && (
        <InfoPanel level="warning">
          No files matched your search criteria
        </InfoPanel>
      )}
      {files.map((file) => (
        <FilesListFile
          key={file.id}
          deleteFileAction={deleteFileAction}
          file={file}
          upsertFileAction={upsertFileAction}
        />
      ))}
    </Stack>
  );
}
