import { Table } from "../../../../../components/Table";
import { TableFooter } from "../../../../../components/Table/TableFooter";
import { Text } from "../../../../../components/Text";
import { UnitWithOccupants } from "../../../../../data/units/listUnits";
import { UnitTableRow } from "./UnitTableRow";

interface Props {
  units: UnitWithOccupants[];
  levyMode: "entitlement" | "custom";
  totalMonthlyBudget: number | null;
}

export function UnitsList({ units, levyMode, totalMonthlyBudget }: Props) {
  const totalShares = units.reduce((sum, u) => sum + u.entitlementShares, 0);

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
      {units.length === 0 && (
        <TableFooter
          content={
            <Text color="secondary">
              No units yet. Add units to track entitlements and levies.
            </Text>
          }
        />
      )}
    </Table>
  );
}
