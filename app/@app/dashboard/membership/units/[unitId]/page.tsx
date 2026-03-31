import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../../auth";
import { Button } from "../../../../../../components/Button";
import { ConfirmButton } from "../../../../../../components/ConfirmButton";
import { DashboardLayout } from "../../../../../../components/DashboardLayout";
import { Details } from "../../../../../../components/Details";
import { DetailsRow } from "../../../../../../components/Details/DetailsRow";
import { Group } from "../../../../../../components/Group";
import { Header } from "../../../../../../components/Header";
import { AddIcon } from "../../../../../../components/Icon/AddIcon";
import { DeleteIcon } from "../../../../../../components/Icon/DeleteIcon";
import { RemoveIcon } from "../../../../../../components/Icon/RemoveIcon";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { Input } from "../../../../../../components/Input";
import { Stack } from "../../../../../../components/Stack";
import { StatusButton } from "../../../../../../components/StatusButton";
import { Text } from "../../../../../../components/Text";
import { listStrataMemberships } from "../../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../../data/stratas/getStrataByDomain";
import { getUnit } from "../../../../../../data/units/getUnit";
import { can } from "../../../../../../data/users/permissions";
import {
  addUnitOccupantAction,
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

  const unit = await getUnit(unitId);
  if (!unit) notFound();

  const canEdit = can(session.user, "stratas.units.edit");
  const canDelete = can(session.user, "stratas.units.delete");

  const allMemberships = await listStrataMemberships({ strataId: strata.id });
  const assignedMembershipIds = new Set(
    unit.occupants.map((o) => o.membershipId),
  );
  const unassignedMembers = allMemberships.filter(
    (m) => m.membershipId && !assignedMembershipIds.has(m.membershipId),
  );

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
              {strata.levyMode === "entitlement" && (
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
              )}
              {strata.levyMode === "custom" && (
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
        <Header as="h3">Assigned Members</Header>

        {unit.occupants.length === 0 && (
          <Text color="secondary">No members assigned to this unit.</Text>
        )}

        {unit.occupants.length > 0 && (
          <Group gap="small" wrap="wrap">
            {unit.occupants.map((occupant) => (
              <form
                key={occupant.membershipId}
                action={
                  canEdit
                    ? removeUnitOccupantAction.bind(
                        undefined,
                        unitId,
                        occupant.membershipId,
                      )
                    : undefined
                }
              >
                <Button
                  type={canEdit ? "submit" : "button"}
                  size="small"
                  style="secondary"
                  color="success"
                  icon={canEdit ? <RemoveIcon /> : undefined}
                  iconTextBehaviour="centerRemainder"
                >
                  {occupant.name}
                </Button>
              </form>
            ))}
          </Group>
        )}

        {canEdit && unassignedMembers.length > 0 && (
          <Stack gap="small">
            <Text color="secondary" fs="small">
              Add member:
            </Text>
            <Group gap="small" wrap="wrap">
              {unassignedMembers.map((m) => (
                <form
                  key={m.userId}
                  action={
                    m.membershipId
                      ? addUnitOccupantAction.bind(
                          undefined,
                          unitId,
                          m.membershipId,
                        )
                      : undefined
                  }
                >
                  <Button
                    type={m.membershipId ? "submit" : "button"}
                    size="small"
                    style="secondary"
                    color="primary"
                    icon={<AddIcon />}
                    iconTextBehaviour="centerRemainder"
                  >
                    {m.name}
                  </Button>
                </form>
              ))}
            </Group>
          </Stack>
        )}
      </Stack>

      {canDelete && (
        <InfoPanel
          action={
            <ConfirmButton
              icon={<DeleteIcon />}
              onClickConfirm={deleteUnitAction.bind(undefined, unitId)}
              color="error"
              style="secondary"
            >
              Delete Unit
            </ConfirmButton>
          }
          header={<Header as="h3">Danger Zone</Header>}
          level="error"
        >
          <Text>
            Deleting a unit will remove all occupant assignments and cannot be
            undone.
          </Text>
        </InfoPanel>
      )}
    </DashboardLayout>
  );
}
