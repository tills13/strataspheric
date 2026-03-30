import { notFound, redirect } from "next/navigation";

import { mustAuth } from "../../../../../../auth";
import { Badge } from "../../../../../../components/Badge";
import { Button } from "../../../../../../components/Button";
import { DashboardLayout } from "../../../../../../components/DashboardLayout";
import { Details } from "../../../../../../components/Details";
import { DetailsRow } from "../../../../../../components/Details/DetailsRow";
import { Group } from "../../../../../../components/Group";
import { RemoveIcon } from "../../../../../../components/Icon/RemoveIcon";
import { Input } from "../../../../../../components/Input";
import { Stack } from "../../../../../../components/Stack";
import { StatusButton } from "../../../../../../components/StatusButton";
import { Text } from "../../../../../../components/Text";
import { listStrataMemberships } from "../../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../../data/stratas/getStrataByDomain";
import { getUnit } from "../../../../../../data/units/getUnit";
import { can, roleLabels } from "../../../../../../data/users/permissions";
import {
  addUnitOccupantAction,
  createUnitAction,
  deleteUnitAction,
  removeUnitOccupantAction,
  updateUnitAction,
} from "../actions";

export default async function Page({
  params,
}: PageProps<"/dashboard/membership/units/[unitId]">) {
  const [session, { unitId }, strata] = await Promise.all([
    mustAuth(),
    params,
    mustGetCurrentStrata(),
  ]);

  if (!can(session.user, "stratas.units.view")) {
    notFound();
  }

  if (unitId === "new") {
    const canCreate = can(session.user, "stratas.units.create");
    if (!canCreate) notFound();

    return (
      <DashboardLayout title="Add Unit">
        <form
          action={async (fd: FormData) => {
            "use server";
            await createUnitAction(fd);
            redirect("/dashboard/membership/units");
          }}
        >
          <Stack>
            <Details>
              <DetailsRow
                title="Unit Number"
                description={
                  <Input
                    name="unit_number"
                    type="text"
                    placeholder="e.g. 101"
                    required
                  />
                }
              />
              <DetailsRow
                title="Entitlement Shares"
                description={
                  <Input
                    name="entitlement_shares"
                    type="number"
                    min={1}
                    defaultValue={1}
                  />
                }
              />
              <DetailsRow
                title="Custom Monthly Fee"
                description={
                  <Input
                    name="custom_monthly_fee"
                    type="number"
                    min={0}
                    placeholder="Leave blank if using entitlement mode"
                  />
                }
              />
            </Details>
            <Button color="primary" style="primary" type="submit">
              Create Unit
            </Button>
          </Stack>
        </form>
      </DashboardLayout>
    );
  }

  const unit = await getUnit(unitId);
  if (!unit) notFound();

  const canEdit = can(session.user, "stratas.units.edit");
  const canDelete = can(session.user, "stratas.units.delete");

  const allMemberships = await listStrataMemberships({ strataId: strata.id });
  const assignedMembershipIds = new Set(
    unit.occupants.map((o) => o.membershipId),
  );
  const unassignedMembers = allMemberships.filter(
    (m) => m.id && !assignedMembershipIds.has(m.id),
  );

  const levy =
    strata.levyMode === "custom"
      ? unit.customMonthlyFee
      : strata.totalMonthlyBudget
        ? `Calculated from entitlement shares`
        : null;

  return (
    <DashboardLayout title={`Unit ${unit.unitNumber}`}>
      <form action={updateUnitAction.bind(undefined, unitId)}>
        <fieldset
          disabled={!canEdit}
          style={{ border: "none", padding: 0, margin: 0 }}
        >
          <Stack>
            <Details>
              <DetailsRow
                title="Unit Number"
                description={
                  canEdit ? (
                    <Input
                      name="unit_number"
                      type="text"
                      defaultValue={unit.unitNumber}
                      required
                    />
                  ) : (
                    <Text>{unit.unitNumber}</Text>
                  )
                }
              />
              <DetailsRow
                title="Entitlement Shares"
                description={
                  canEdit ? (
                    <Input
                      name="entitlement_shares"
                      type="number"
                      min={1}
                      defaultValue={unit.entitlementShares}
                    />
                  ) : (
                    <Text>{unit.entitlementShares}</Text>
                  )
                }
              />
              <DetailsRow
                title="Custom Monthly Fee"
                description={
                  canEdit ? (
                    <Input
                      name="custom_monthly_fee"
                      type="number"
                      min={0}
                      defaultValue={unit.customMonthlyFee ?? undefined}
                      placeholder="Not set"
                    />
                  ) : (
                    <Text>
                      {unit.customMonthlyFee != null
                        ? `$${unit.customMonthlyFee}/mo`
                        : "Not set"}
                    </Text>
                  )
                }
              />
              {levy != null && (
                <DetailsRow
                  title="Monthly Levy"
                  description={
                    <Text>
                      {typeof levy === "number" ? `$${levy}/mo` : levy}
                    </Text>
                  }
                />
              )}
            </Details>

            {canEdit && (
              <StatusButton color="success" style="primary" type="submit">
                Update Unit
              </StatusButton>
            )}
          </Stack>
        </fieldset>
      </form>

      <Stack>
        <Text fw="bold">Assigned Members</Text>
        {unit.occupants.length === 0 && (
          <Text color="secondary">No members assigned to this unit.</Text>
        )}
        {unit.occupants.map((occupant) => (
          <Group
            key={occupant.membershipId}
            align="center"
            justify="space-between"
          >
            <Group align="center">
              <Text>{occupant.name}</Text>
              <Badge level="info">{roleLabels[occupant.role]}</Badge>
            </Group>
            {canEdit && (
              <StatusButton
                action={removeUnitOccupantAction.bind(
                  undefined,
                  unitId,
                  occupant.membershipId,
                )}
                icon={<RemoveIcon />}
                style="tertiary"
                color="error"
                size="small"
              />
            )}
          </Group>
        ))}

        {canEdit && unassignedMembers.length > 0 && (
          <>
            <Text fw="bold">Add Member</Text>
            {unassignedMembers.map((m) => (
              <Group key={m.userId} align="center" justify="space-between">
                <Group align="center">
                  <Text>{m.name}</Text>
                  <Badge>{roleLabels[m.role]}</Badge>
                </Group>
                {m.id && (
                  <StatusButton
                    action={addUnitOccupantAction.bind(undefined, unitId, m.id)}
                    color="primary"
                    style="secondary"
                    size="small"
                  >
                    Assign
                  </StatusButton>
                )}
              </Group>
            ))}
          </>
        )}
      </Stack>

      {canDelete && (
        <StatusButton
          action={deleteUnitAction.bind(undefined, unitId)}
          color="error"
          style="secondary"
        >
          Delete Unit
        </StatusButton>
      )}
    </DashboardLayout>
  );
}
