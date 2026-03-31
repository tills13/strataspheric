import { NothingHere } from "../../../../../components/NothingHere";
import { Table } from "../../../../../components/Table";
import { UnitWithOccupants } from "../../../../../data/units/listUnits";
import { UnitTableRow } from "./UnitTableRow";

interface Props {
  units: UnitWithOccupants[];
  levyMode: "entitlement" | "custom";
  totalMonthlyBudget: number | null;
}

export function UnitsList({ units, levyMode, totalMonthlyBudget }: Props) {
  const totalShares = units.reduce((sum, u) => sum + u.entitlementShares, 0);

  if (units.length === 0) {
    return <NothingHere>No units yet. Add units to track entitlements and levies.</NothingHere>;
  }

  return (
    <Table>
      {units.map((unit) => (
        <UnitTableRow
          key={unit.id}
          unit={unit}
          levyMode={levyMode}
          totalMonthlyBudget={totalMonthlyBudget}
          totalShares={totalShares}
        />
      ))}
    </Table>
  );
}
