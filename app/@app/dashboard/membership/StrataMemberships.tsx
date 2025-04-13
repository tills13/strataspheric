import * as styles from "./styles.css";

import { auth } from "../../../../auth";
import { getStrataMemberships } from "../../../../data/strataMemberships/getStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { MembershipTile } from "./MembershipTile";
import {
  approveStrataMembershipAction,
  deleteStrataMembershipAction,
  upsertStrataMembershipAction,
} from "./actions";

interface Props {
  className?: string;
}

export async function StrataMemberships({ className }: Props) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const canUpsert = can(
    session?.user,
    "stratas.memberships.create",
    "stratas.memberships.edit",
  );

  const memberships = await getStrataMemberships(strata.id, canUpsert);

  return (
    <div className={classnames(className, styles.membershipGrid)}>
      {memberships.map((membership) => (
        <MembershipTile
          key={membership.id}
          approveStrataMembership={approveStrataMembershipAction}
          deleteStrataMembership={deleteStrataMembershipAction}
          membership={membership}
          upsertStrataMembership={upsertStrataMembershipAction}
        />
      ))}
    </div>
  );
}
