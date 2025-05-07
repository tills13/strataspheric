import { s } from "../../../../sprinkles.css";

import { Bone } from "../../../../components/Skeleton/Bone";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";
import { range } from "../../../../utils/arrays";

export default function Loading() {
  return (
    <>
      <Table>
        {[...range(10)].map((row) => (
          <TableRow
            key={row}
            content={<Bone />}
            rowEnd={<Bone className={s({ flex: 1 })} />}
          />
        ))}
      </Table>
    </>
  );
}
