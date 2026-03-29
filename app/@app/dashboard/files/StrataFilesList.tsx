import { NothingHere } from "../../../../components/NothingHere";
import { Table } from "../../../../components/Table";
import { File } from "../../../../data";
import { FileRow } from "./FileRow";

interface Props {
  files: File[];
}

export function StrataFilesList({ files }: Props) {
  return (
    <>
      {files.length === 0 && <NothingHere />}

      <Table>
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </Table>
    </>
  );
}
