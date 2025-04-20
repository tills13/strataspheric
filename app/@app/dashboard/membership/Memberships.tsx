import * as styles from "./styles.css";

import { auth } from "../../../../auth";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { MembershipTile } from "./MembershipTile";

interface Props {
  className?: string;
}

export async function Memberships({ className }: Props) {
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
    <div className={classnames(className, styles.membershipGrid)}>
      {memberships.map((membership) => (
        <MembershipTile key={membership.id} membership={membership} />
      ))}
    </div>
  );
}
