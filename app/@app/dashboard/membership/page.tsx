import { s } from "../../../../sprinkles.css";

import React, { Suspense } from "react";

import { auth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { can } from "../../../../data/users/permissions";
import { AddNewMemberButton } from "./AddNewMemberButton";
import { Memberships } from "./Memberships";
import { MembershipsLoader } from "./MembershipsLoader";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <div className={s({ p: "normal" })}>
        <Group justify="space-between">
          <Header as="h2">Directory</Header>

          <div>
            {can(session?.user, "stratas.memberships.create") && (
              <AddNewMemberButton />
            )}
          </div>
        </Group>
      </div>

      <Suspense fallback={<MembershipsLoader />}>
        <Memberships />
      </Suspense>
    </div>
  );
}
