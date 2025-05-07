import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Bone } from "../../../../components/Skeleton/Bone";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";

export default function Loading() {
  return (
    <DashboardLayout title="Inbox">
      <Table>
        <TableRow content={<Bone />} />
        <TableRow content={<Bone />} />
        <TableRow content={<Bone />} />
        <TableRow content={<Bone />} />
        <TableRow content={<Bone />} />
      </Table>
    </DashboardLayout>
  );
}
