import { auth } from "../../../../auth";
import { Table } from "../../../../components/Table";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { MembershipTableRow } from "./MembershipTableRow";

export async function Memberships() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const memberships = await listStrataMemberships({
    strataId: strata.id,
  });

  return (
    <div>
      <Table>
        {memberships.map((membership) => (
          <MembershipTableRow key={membership.userId} membership={membership} />
        ))}
      </Table>
    </div>
  );
}
