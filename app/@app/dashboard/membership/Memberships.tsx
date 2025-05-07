import { auth } from "../../../../auth";
import { Grid } from "../../../../components/Grid";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { MembershipTile } from "./MembershipTile";

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
    <Grid cols={{ base: 1, tablet: 2, desktop: 4 }} p="normal" pt="0">
      {memberships.map((membership) => (
        <MembershipTile key={membership.id} membership={membership} />
      ))}
    </Grid>
  );
}
