import { TableRow } from "../../../../../components/Table/TableRow";
import { Text } from "../../../../../components/Text";
import { UnitWithOccupants } from "../../../../../data/units/listUnits";

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
        <Text fw="bold" whiteSpace="nowrap" color="primary">
          {unit.unitNumber}
        </Text>
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
