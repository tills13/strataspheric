import { s } from "../../../../sprinkles.css";
import * as styles from "./styles.css";

import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { auth } from "../../../../auth";
import { Bone } from "../../../../components/Skeleton/Bone";
import { getStrataMemberships } from "../../../../data/strataMemberships/getStrataMemberships";
import { getStrataPlan } from "../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { range } from "../../../../utils/arrays";
import { classnames } from "../../../../utils/classnames";
import { MembershipHeader } from "./MembershipHeader";
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
        <Suspense
          fallback={
            <div className={styles.membershipGrid}>
              {[...range(3)].map((i) => (
                <div className={styles.membershipTile} key={i}>
                  <Bone className={s({ mb: "small" })} />
                  <Bone
                    className={s({ mb: "normal" })}
                    style={{ maxWidth: 80 }}
                    inline
                  />
                  <Bone className={s({ mb: "small" })} />
                  <Bone className={s({ mb: "small" })} />
                  <Bone className={s({ mb: "small" })} />
                </div>
              ))}
            </div>
          }
        >
          <StrataMemberships />
        </Suspense>
      </div>
    </>
  );
}
