import { Badge } from "../../../../../components/Badge";
import { Group } from "../../../../../components/Group";
import { TableRow } from "../../../../../components/Table/TableRow";
import { Text } from "../../../../../components/Text";
import { UnitWithOccupants } from "../../../../../data/units/listUnits";
import { roleLabels } from "../../../../../data/users/permissions";

interface Props {
  unit: UnitWithOccupants;
  levyMode: "entitlement" | "custom";
  totalMonthlyBudget: number | null;
  totalShares: number;
}

function computeLevy(
  unit: UnitWithOccupants,
  levyMode: "entitlement" | "custom",
  totalMonthlyBudget: number | null,
  totalShares: number,
): number | null {
  if (levyMode === "custom") {
    return unit.customMonthlyFee;
  }
  if (totalMonthlyBudget && totalShares > 0) {
    return Math.round(
      (unit.entitlementShares / totalShares) * totalMonthlyBudget,
    );
  }
  return null;
}

export function UnitTableRow({
  unit,
  levyMode,
  totalMonthlyBudget,
  totalShares,
}: Props) {
  const levy = computeLevy(unit, levyMode, totalMonthlyBudget, totalShares);

  return (
    <TableRow
      content={
        <Group flex={1} align="center">
          <Text fw="bold" whiteSpace="nowrap" color="primary">
            Unit {unit.unitNumber}
          </Text>
          {levyMode === "entitlement" && (
            <Text color="secondary">{unit.entitlementShares} shares</Text>
          )}
          {unit.occupants.map((o) => (
            <Badge key={o.membershipId} level="info">
              {o.name} ({roleLabels[o.role]})
            </Badge>
          ))}
        </Group>
      }
      rowEnd={
        levy != null ? (
          <Text color="secondary" whiteSpace="nowrap">
            ${levy}/mo
          </Text>
        ) : undefined
      }
      rowId={unit.id}
      link={`/dashboard/membership/units/${unit.id}`}
    />
  );
}
