import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Bone } from "../../../../components/Skeleton/Bone";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";

export default function Loading() {
  return (
    <DashboardLayout title="Inbox">
      <Table>
        <TableRow rowId="skeleton-1" content={<Bone />} />
        <TableRow rowId="skeleton-2" content={<Bone />} />
        <TableRow rowId="skeleton-3" content={<Bone />} />
        <TableRow rowId="skeleton-4" content={<Bone />} />
        <TableRow rowId="skeleton-5" content={<Bone />} />
      </Table>
    </DashboardLayout>
  );
}
