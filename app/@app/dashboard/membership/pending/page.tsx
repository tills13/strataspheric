import { notFound } from "next/navigation";

import { auth } from "../../../../../auth";
import { BulkMembershipActions } from "../../../../../components/BulkMembershipActions";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Group } from "../../../../../components/Group";
import { NothingHere } from "../../../../../components/NothingHere";
import { SelectAllCheckbox } from "../../../../../components/SelectAllCheckbox";
import { Table } from "../../../../../components/Table";
import { TableSelectProvider } from "../../../../../components/Table/TableSelectProvider";
import { listStrataMemberships } from "../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { MembershipTableRow } from "../MembershipTableRow";

export default async function Page() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  if (!can(session?.user, "stratas.memberships.edit")) {
    notFound();
  }

  const memberships = await listStrataMemberships({
    strataId: strata.id,
    pendingOnly: true,
  });

  return (
    <TableSelectProvider>
      <DashboardLayout
        selectAll={
          <SelectAllCheckbox rowIds={memberships.map((m) => m.userId)} />
        }
        actions={
          <Group gap="small">
            <BulkMembershipActions />
          </Group>
        }
        title="Pending Members"
      >
        {memberships.length > 0 ? (
          <Table>
            {memberships.map((membership) => (
              <MembershipTableRow
                key={membership.id}
                membership={membership}
              />
            ))}
          </Table>
        ) : (
          <NothingHere>No pending members.</NothingHere>
        )}
      </DashboardLayout>
    </TableSelectProvider>
  );
}
