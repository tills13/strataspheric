import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Text } from "../../../../../components/Text";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { listUnits } from "../../../../../data/units/listUnits";
import { can } from "../../../../../data/users/permissions";
import { CreateNewUnitButton } from "./CreateNewUnitButton";
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
  const missingBudget =
    strata.levyMode === "entitlement" && !strata.totalMonthlyBudget;
  const unitsMissingFee =
    strata.levyMode === "custom"
      ? units.filter((u) => u.customMonthlyFee == null)
      : [];

  return (
    <DashboardLayout
      title="Units"
      actions={
        canCreate ? (
          <CreateNewUnitButton levyMode={strata.levyMode} />
        ) : undefined
      }
    >
      {overLimit && (
        <InfoPanel level="warning">
          <Text>
            You have {units.length} units but your plan covers{" "}
            {strata.numUnits}. Update your plan to avoid billing adjustments.
          </Text>
        </InfoPanel>
      )}
      {missingBudget && (
        <InfoPanel level="warning">
          <Text>
            Levy mode is set to entitlement but no monthly budget has been
            configured. Set a total monthly budget in strata settings to
            calculate unit levies.
          </Text>
        </InfoPanel>
      )}
      {unitsMissingFee.length > 0 && (
        <InfoPanel level="warning">
          <Text>
            {unitsMissingFee.length === 1
              ? `Unit ${unitsMissingFee[0]!.unitNumber} is`
              : `${unitsMissingFee.length} units are`}{" "}
            missing a custom monthly fee. Levies cannot be calculated until all
            units have a fee set.
          </Text>
        </InfoPanel>
      )}
      <UnitsList
        units={units}
        levyMode={strata.levyMode}
        totalMonthlyBudget={strata.totalMonthlyBudget}
      />
    </DashboardLayout>
  );
}
