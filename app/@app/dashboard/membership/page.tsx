import * as styles from "./styles.css";

import React, { Suspense } from "react";

import { MembershipHeader } from "./MembershipHeader";
import { MembershipsLoader } from "./MembershipsLoader";
import { StrataMemberships } from "./StrataMemberships";
import { upsertStrataMembershipAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  return (
    <>
      <MembershipHeader
        upsertStrataMembership={upsertStrataMembershipAction.bind(
          undefined,
          undefined,
        )}
      />

      <div className={styles.membershipTableContainer}>
        <Suspense fallback={<MembershipsLoader />}>
          <StrataMemberships />
        </Suspense>
      </div>
    </>
  );
}
