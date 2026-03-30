import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Group } from "../../../../../components/Group";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { Text } from "../../../../../components/Text";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { listUnits } from "../../../../../data/units/listUnits";
import { can } from "../../../../../data/users/permissions";
import { UnitsList } from "./UnitsList";

export default async function Page() {
  const [session, strata] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
  ]);

  if (!can(session.user, "stratas.units.view")) {
    notFound();
  }

  const units = await listUnits(strata.id);
  const canCreate = can(session.user, "stratas.units.create");
  const overLimit = units.length > strata.numUnits;

  return (
    <DashboardLayout
      title="Units"
      actions={
        canCreate ? (
          <InternalLink href="/dashboard/membership/units/new" noUnderline>
            <Button color="primary" style="primary" size="small">
              Add Unit
            </Button>
          </InternalLink>
        ) : undefined
      }
    >
      {overLimit && (
        <Group p="normal">
          <Text color="error" fw="bold">
            You have {units.length} units but your plan covers{" "}
            {strata.numUnits}. Update your plan to avoid billing adjustments.
          </Text>
        </Group>
      )}
      <UnitsList
        units={units}
        levyMode={strata.levyMode}
        totalMonthlyBudget={strata.totalMonthlyBudget}
      />
    </DashboardLayout>
  );
}
