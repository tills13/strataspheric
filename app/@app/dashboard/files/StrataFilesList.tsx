import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { NothingHere } from "../../../../components/NothingHere";
import { Stack } from "../../../../components/Stack";
import { listFiles } from "../../../../data/files/listFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { FilesListFile } from "./FilesListFile";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export async function StrataFilesList({ searchTerm, visibility }: Props) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);
  const canDelete = can(session?.user, "stratas.files.delete");

  const files = await listFiles({
    strataId: strata.id,
    isPublic:
      !canDelete ||
      (typeof visibility === "undefined" ? undefined : visibility === "public"),
    ...(searchTerm && { searchTerm }),
  });

  return (
    <Stack p="normal" pt="0" className={classnames(styles.filesList)}>
      {files.length === 0 && <NothingHere />}

      {files.map((file) => (
        <FilesListFile key={file.id} file={file} showImagePreview />
      ))}
    </Stack>
  );
}
