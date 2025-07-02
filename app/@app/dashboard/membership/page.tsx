import React from "react";

import { auth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { can } from "../../../../data/users/permissions";
import { AddNewMemberButton } from "./AddNewMemberButton";
import { Memberships } from "./Memberships";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  return (
    <DashboardLayout
      actions={
        can(session?.user, "stratas.memberships.create") && (
          <AddNewMemberButton />
        )
      }
      title="Strata Members"
    >
      <Memberships />
    </DashboardLayout>
  );
}
