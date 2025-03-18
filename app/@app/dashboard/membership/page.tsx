import { s } from "../../../../sprinkles.css";

import React, { Suspense } from "react";

import { auth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { can, p } from "../../../../data/users/permissions";
import { AddNewMemmberButton } from "./AddNewMemberButton";
import { MembershipsLoader } from "./MembershipsLoader";
import { StrataMemberships } from "./StrataMemberships";
import { upsertStrataMembershipAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <DashboardHeader />

      <div>
        <div className={s({ p: "normal" })}>
          <Group justify="space-between">
            <Header priority={2}>Directory</Header>

            <div>
              {can(session?.user, p("stratas", "memberships", "create")) && (
                <AddNewMemmberButton
                  upsertStrataMembership={upsertStrataMembershipAction.bind(
                    undefined,
                    undefined,
                  )}
                />
              )}
            </div>
          </Group>
        </div>

        <Suspense fallback={<MembershipsLoader />}>
          <StrataMemberships />
        </Suspense>
      </div>
    </>
  );
}
