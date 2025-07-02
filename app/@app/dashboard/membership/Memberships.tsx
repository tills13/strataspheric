import { s } from "../../../../sprinkles.css";

import { auth } from "../../../../auth";
import { Table } from "../../../../components/Table";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { MembershipTableRow } from "./MembershipTableRow";

export async function Memberships() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const canUpsert = can(
    session?.user,
    "stratas.memberships.create",
    "stratas.memberships.edit",
  );

  const memberships = await listStrataMemberships({
    strataId: strata.id,
    includePending: canUpsert,
  });

  return (
    <div className={s({ ph: "normal" })}>
      <Table>
        {memberships.map((membership) => (
          <MembershipTableRow key={membership.id} membership={membership} />
        ))}
      </Table>
    </div>
  );
}
