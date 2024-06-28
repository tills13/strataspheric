import * as styles from "./styles.css";

import { notFound } from "next/navigation";

import { auth } from "../../../../auth";
import { StrataMembership, User } from "../../../../data";
import { getStrataMemberships } from "../../../../data/strataMemberships/getStrataMemberships";
import { getStrataPlan } from "../../../../data/strataPlans/getStrataPlan";
import {
  getCurrentStrata,
  mustGetCurrentStrata,
} from "../../../../data/stratas/getStrataByDomain";
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
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  const plan = await getStrataPlan(strata.id);

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
          approveStrataMembership={approveStrataMembershipAction}
          key={membership.id}
          deleteMember={deleteStrataMembershipAction}
          membership={membership}
          upsertMember={upsertStrataMembershipAction}
        />
      ))}
    </div>
  );
}
