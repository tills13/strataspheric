import * as styles from "./styles.css";

import { notFound } from "next/navigation";
import React from "react";

import { auth } from "../../../../auth";
import { getStrataMemberships } from "../../../../data/strataMemberships/getStrataMemberships";
import { getStrataPlan } from "../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { MembershipGrid } from "./MembershipGrid";
import { MembershipHeader } from "./MembershipHeader";
import { upsertStrataMembershipAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const plan = await getStrataPlan(strata.id);

  const canUpsert = can(
    session?.user,
    "stratas.memberships.create",
    "stratas.memberships.edit",
  );

  const memberships = await getStrataMemberships(strata.id, canUpsert);

  return (
    <>
      <MembershipHeader
        upsertStrataMembership={upsertStrataMembershipAction.bind(
          undefined,
          undefined,
        )}
      />

      <div className={styles.membershipTableContainer}>
        <MembershipGrid memberships={memberships} />
      </div>
    </>
  );
}