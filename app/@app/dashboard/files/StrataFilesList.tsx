import { s } from "../../../../sprinkles.css";

import { auth } from "../../../../auth";
import { NothingHere } from "../../../../components/NothingHere";
import { Table } from "../../../../components/Table";
import { listFiles } from "../../../../data/files/listFiles";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { FileRow } from "./FileRow";

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
    <>
      {files.length === 0 && <NothingHere />}

      <Table className={s({ ph: "normal" })}>
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </Table>
    </>
  );
}
