import { s } from "../../../../sprinkles.css";

import { auth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Table } from "../../../../components/Table";
import { Text } from "../../../../components/Text";
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

  const totalMonthlyFees = memberships.reduce(
    (sum, m) => sum + (m.monthlyFee ?? 0),
    0,
  );
  const hasFees = memberships.some((m) => m.monthlyFee != null);

  return (
    <div className={s({ ph: "normal" })}>
      <Table>
        {memberships.map((membership) => (
          <MembershipTableRow key={membership.id} membership={membership} />
        ))}
      </Table>
      {hasFees && (
        <Group justify="end" className={s({ pt: "small" })}>
          <Text color="secondary">Total monthly fees:</Text>
          <Text fw="bold">${totalMonthlyFees}/mo</Text>
        </Group>
      )}
    </div>
  );
}
