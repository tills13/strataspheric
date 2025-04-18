import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { NothingHere } from "../../../../components/NothingHere";
import { Stack } from "../../../../components/Stack";
import { searchFiles } from "../../../../data/files/searchFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { FilesListFile } from "./FilesListFile";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function StrataFilesList({ searchTerm, visibility }: Props) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);
  const canDelete = can(session?.user, p("stratas", "files", "delete"));

  const files = await searchFiles(strata.id, canDelete, searchTerm, visibility);

  return (
    <Stack className={classnames(styles.filesList)}>
      {files.length === 0 && <NothingHere />}

      {files.map((file) => (
        <FilesListFile key={file.id} file={file} showImagePreview />
      ))}
    </Stack>
  );
}
