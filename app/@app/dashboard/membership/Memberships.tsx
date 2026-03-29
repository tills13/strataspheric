import { auth } from "../../../../auth";
import { Table } from "../../../../components/Table";
import { TableFooter } from "../../../../components/Table/TableFooter";
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
  });

  const totalMonthlyFees = memberships.reduce(
    (sum, m) => sum + (m.monthlyFee ?? 0),
    0,
  );
  const hasFees = memberships.some((m) => m.monthlyFee != null);

  return (
    <div>
      <Table>
        {memberships.map((membership) => (
          <MembershipTableRow key={membership.id} membership={membership} />
        ))}
        {canUpsert && hasFees && (
          <TableFooter
            end={
              <>
                <Text color="secondary" whiteSpace="nowrap">
                  Total monthly fees:
                </Text>
                <Text fw="bold" whiteSpace="nowrap">
                  ${totalMonthlyFees}/mo
                </Text>
              </>
            }
          />
        )}
      </Table>
    </div>
  );
}
