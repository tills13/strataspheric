import * as styles from "./styles.css";

import { notFound } from "next/navigation";
import React from "react";

import { auth } from "../../../../../auth";
import { getStrataMembership } from "../../../../../data/strataMemberships/getStrataMembership";
import { getStrataPlan } from "../../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { MembershipHeader } from "./MembershipHeader";
import { MembershipTable } from "./MembershipTable";
import {
  addStrataMemberAction,
  approveStrataMembershipAction,
  deleteStrataMemberAction,
  updateStrataMemberAction,
} from "./actions";

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

  const memberships = await getStrataMembership(strata.id, canUpsert);

  return (
    <>
      <MembershipHeader
        addStrataMember={addStrataMemberAction.bind(undefined, strata.id)}
      />

      <div className={styles.membershipTableContainer}>
        <MembershipTable
          approveStrataMembership={approveStrataMembershipAction.bind(
            undefined,
            strata.id,
          )}
          memberships={memberships}
          removeStrataMember={deleteStrataMemberAction.bind(
            undefined,
            strata.id,
          )}
          updateStrataMember={updateStrataMemberAction.bind(
            undefined,
            strata.id,
          )}
        />
      </div>
    </>
  );
}
