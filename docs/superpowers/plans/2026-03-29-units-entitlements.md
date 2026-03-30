# Units, Entitlements & Levies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a concrete `units` table, split monthly fees off memberships onto units, support entitlement-based and custom levy modes, and add a Units sub-tab under the Directory.

**Architecture:** New `units` and `unit_occupants` tables. Add `id` to `strata_memberships` for FK reference. Add `levyMode` and `totalMonthlyBudget` to `stratas`. New "units" permission scope. Units UI as a sub-tab of Directory. Add "tenant" and "resident" roles.

**Tech Stack:** Next.js 15, Kysely (D1), Vanilla Extract, Server Actions, uuidv7

---

## File Map

### New Files

- `migrations/039_units_and_entitlements.sql` — DDL for new tables and schema changes
- `data/units/createUnit.ts` — insert a unit
- `data/units/getUnit.ts` — fetch a unit by id with occupants
- `data/units/listUnits.ts` — list units for a strata
- `data/units/updateUnit.ts` — update a unit
- `data/units/deleteUnit.ts` — delete a unit and its occupants
- `data/units/addUnitOccupant.ts` — add a member to a unit
- `data/units/removeUnitOccupant.ts` — remove a member from a unit
- `app/@app/dashboard/membership/units/page.tsx` — units list page
- `app/@app/dashboard/membership/units/UnitsList.tsx` — units table component
- `app/@app/dashboard/membership/units/UnitTableRow.tsx` — individual unit row
- `app/@app/dashboard/membership/units/actions.ts` — server actions for units CRUD
- `app/@app/dashboard/membership/units/[unitId]/page.tsx` — unit detail/edit page

### Modified Files

- `data/index.ts` — add UnitsTable, UnitOccupantsTable interfaces; add levyMode/totalMonthlyBudget to StratasTable; add id to StrataMembershipsTable; register new tables in Database
- `data/users/permissions.ts` — add "tenant", "resident" roles; add "units" scope; update roleScopeToScopes
- `data/memberships/createStrataMembership.ts` — generate `id` with uuidv7
- `data/memberships/getStrataMembership.ts` — select `id` (already uses selectAll)
- `constants/navigation.ts` — add Units sub-link under /dashboard/membership
- `app/@app/dashboard/settings/SettingsPage.tsx` — add Levies fieldset
- `app/@app/actions.ts` — handle levyMode and totalMonthlyBudget in updateStrataAction
- `app/@app/dashboard/membership/Memberships.tsx` — remove monthlyFee total display
- `app/@app/dashboard/membership/MembershipTableRow.tsx` — remove monthlyFee display
- `app/@app/dashboard/membership/[userId]/page.tsx` — remove monthlyFee fields, remove unit field
- `app/@app/dashboard/membership/actions.ts` — remove monthlyFee and unit from upsert action
- `components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields.tsx` — remove monthlyFee and unit fields

---

### Task 1: Migration — schema changes

**Files:**

- Create: `migrations/039_units_and_entitlements.sql`

- [ ] **Step 1: Write the migration SQL**

```sql
-- Add id column to strata_memberships
ALTER TABLE strata_memberships ADD COLUMN id TEXT;

-- Create units table
CREATE TABLE units (
  id TEXT PRIMARY KEY,
  strataId TEXT NOT NULL REFERENCES stratas(id),
  unitNumber TEXT NOT NULL,
  entitlementShares INTEGER NOT NULL DEFAULT 1,
  customMonthlyFee INTEGER,
  createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(strataId, unitNumber)
);

-- Create unit_occupants join table
CREATE TABLE unit_occupants (
  unitId TEXT NOT NULL REFERENCES units(id),
  membershipId TEXT NOT NULL REFERENCES strata_memberships(id),
  PRIMARY KEY (unitId, membershipId)
);

-- Add levy settings to stratas
ALTER TABLE stratas ADD COLUMN levyMode TEXT NOT NULL DEFAULT 'entitlement';
ALTER TABLE stratas ADD COLUMN totalMonthlyBudget INTEGER;
```

- [ ] **Step 2: Commit**

```bash
git add migrations/039_units_and_entitlements.sql
git commit -m "feat: add migration for units, unit_occupants, and levy settings"
```

> **Note:** The `monthlyFee` and `unit` columns on `strata_memberships` are intentionally NOT dropped in this migration. They'll be removed in a future cleanup migration after the UI is fully migrated. Existing membership `id` values will be backfilled via application code when memberships are accessed.

---

### Task 2: Schema types — update data/index.ts

**Files:**

- Modify: `data/index.ts`

- [ ] **Step 1: Add UnitsTable and UnitOccupantsTable interfaces, add id to StrataMembershipsTable, add levy fields to StratasTable**

Add after the `StrataMembershipsTable` type aliases (after line 262):

```typescript
export interface UnitsTable {
  id: ColumnType<string, string, never>;
  strataId: string;
  unitNumber: string;
  entitlementShares: ColumnType<number, number | undefined, number>;
  customMonthlyFee: number | null;
  createdAt: ColumnType<number, never, never>;
}

export type Unit = Selectable<UnitsTable>;
export type NewUnit = Insertable<UnitsTable>;
export type UnitUpdate = Updateable<UnitsTable>;

export interface UnitOccupantsTable {
  unitId: string;
  membershipId: string;
}

export type UnitOccupant = Selectable<UnitOccupantsTable>;
export type NewUnitOccupant = Insertable<UnitOccupantsTable>;
```

Add `id` to `StrataMembershipsTable`:

```typescript
export interface StrataMembershipsTable {
  id: ColumnType<string, string, never>; // <-- ADD THIS
  strataId: ColumnType<string, string, never>;
  userId: ColumnType<string, string, never>;
  unit: string | null;
  rawPermissions: string | null;
  role: Role;
  phoneNumber: string | null;
  monthlyFee: number | null;
  notifyEvents: ColumnType<0 | 1, 0 | 1 | undefined, 0 | 1>;
}
```

Add levy fields to `StratasTable`:

```typescript
// Add these two fields to the StratasTable interface:
levyMode: ColumnType<"entitlement" | "custom", string | undefined, string>;
totalMonthlyBudget: number | null;
```

Register tables in the `Database` interface:

```typescript
// Add to Database interface:
units: UnitsTable;
unit_occupants: UnitOccupantsTable;
```

- [ ] **Step 2: Commit**

```bash
git add data/index.ts
git commit -m "feat: add unit and unit_occupant schema types, extend strata and membership types"
```

---

### Task 3: Permissions — add roles and units scope

**Files:**

- Modify: `data/users/permissions.ts`

- [ ] **Step 1: Add "tenant" and "resident" roles, "units" scope, and update roleScopeToScopes**

Update the `roles` array (line 17-25):

```typescript
export const roles = [
  "administrator",
  "president",
  "vice-president",
  "treasurer",
  "secretary",
  "owner",
  "tenant",
  "resident",
  "pending",
] as const;
```

Update `roleLabels` (line 27-35):

```typescript
export const roleLabels: Record<Role, string> = {
  owner: "Owner",
  tenant: "Tenant",
  resident: "Resident",
  secretary: "Secretary",
  treasurer: "Treasurer",
  "vice-president": "Vice President",
  president: "President",
  administrator: "Administrator",
  pending: "Pending",
};
```

Add "units" to the `scopes` array (line 2-15):

```typescript
export const scopes = [
  "amenities",
  "amenity_bookings",
  "events",
  "files",
  "inbox_blasts",
  "inbox_messages",
  "inbox_thread_chats",
  "invoices",
  "meetings",
  "memberships",
  "settings",
  "units",
  "widgets",
] as const;
```

Update `roleScopeToScopes` — add cases for tenant and resident (after the "owner" case, before "default"):

```typescript
    case "tenant":
    case "resident": {
      return [
        "stratas.amenities.view",
        "stratas.events.view",
        "stratas.files.view",
        "stratas.memberships.view",
      ];
    }
```

- [ ] **Step 2: Commit**

```bash
git add data/users/permissions.ts
git commit -m "feat: add tenant/resident roles and units scope to permissions"
```

---

### Task 4: Data layer — membership id generation

**Files:**

- Modify: `data/memberships/createStrataMembership.ts`

- [ ] **Step 1: Generate id on insert**

Replace the full file content:

```typescript
import { uuidv7 } from "uuidv7";

import { NewStrataMembership, db } from "..";

export async function createStrataMembership(
  strataMembership: NewStrataMembership,
) {
  return db()
    .insertInto("strata_memberships")
    .values({
      id: uuidv7(),
      ...strataMembership,
    })
    .execute();
}
```

- [ ] **Step 2: Commit**

```bash
git add data/memberships/createStrataMembership.ts
git commit -m "feat: generate uuidv7 id for new strata memberships"
```

---

### Task 5: Data layer — unit CRUD functions

**Files:**

- Create: `data/units/createUnit.ts`
- Create: `data/units/getUnit.ts`
- Create: `data/units/listUnits.ts`
- Create: `data/units/updateUnit.ts`
- Create: `data/units/deleteUnit.ts`
- Create: `data/units/addUnitOccupant.ts`
- Create: `data/units/removeUnitOccupant.ts`

- [ ] **Step 1: Create data/units/createUnit.ts**

```typescript
import { uuidv7 } from "uuidv7";

import { NewUnit, Unit, db } from "..";

export async function createUnit(newUnit: Omit<NewUnit, "id">): Promise<Unit> {
  return db()
    .insertInto("units")
    .values({
      id: uuidv7(),
      ...newUnit,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
```

- [ ] **Step 2: Create data/units/getUnit.ts**

```typescript
import { db } from "..";

export async function getUnit(unitId: string) {
  const unit = await db()
    .selectFrom("units")
    .selectAll()
    .where("units.id", "=", unitId)
    .executeTakeFirst();

  if (!unit) return undefined;

  const occupants = await db()
    .selectFrom("unit_occupants")
    .innerJoin(
      "strata_memberships",
      "strata_memberships.id",
      "unit_occupants.membershipId",
    )
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .select([
      "unit_occupants.membershipId",
      "strata_memberships.userId",
      "strata_memberships.role",
      "users.name",
      "users.email",
    ])
    .where("unit_occupants.unitId", "=", unitId)
    .execute();

  return { ...unit, occupants };
}

export type UnitWithOccupants = NonNullable<
  Awaited<ReturnType<typeof getUnit>>
>;
```

- [ ] **Step 3: Create data/units/listUnits.ts**

```typescript
import { db } from "..";

export async function listUnits(strataId: string) {
  const units = await db()
    .selectFrom("units")
    .selectAll()
    .where("units.strataId", "=", strataId)
    .orderBy("units.unitNumber", "asc")
    .execute();

  const unitIds = units.map((u) => u.id);

  if (unitIds.length === 0) return [];

  const occupants = await db()
    .selectFrom("unit_occupants")
    .innerJoin(
      "strata_memberships",
      "strata_memberships.id",
      "unit_occupants.membershipId",
    )
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .select([
      "unit_occupants.unitId",
      "unit_occupants.membershipId",
      "strata_memberships.userId",
      "strata_memberships.role",
      "users.name",
      "users.email",
    ])
    .where("unit_occupants.unitId", "in", unitIds)
    .execute();

  return units.map((unit) => ({
    ...unit,
    occupants: occupants.filter((o) => o.unitId === unit.id),
  }));
}

export type UnitWithOccupants = Awaited<ReturnType<typeof listUnits>>[number];
```

- [ ] **Step 4: Create data/units/updateUnit.ts**

```typescript
import { Unit, UnitUpdate, db } from "..";

export async function updateUnit(unitId: Unit["id"], unitUpdate: UnitUpdate) {
  return db()
    .updateTable("units")
    .set(unitUpdate)
    .where("units.id", "=", unitId)
    .execute();
}
```

- [ ] **Step 5: Create data/units/deleteUnit.ts**

```typescript
import { db } from "..";

export async function deleteUnit(unitId: string) {
  await db()
    .deleteFrom("unit_occupants")
    .where("unit_occupants.unitId", "=", unitId)
    .execute();

  return db().deleteFrom("units").where("units.id", "=", unitId).execute();
}
```

- [ ] **Step 6: Create data/units/addUnitOccupant.ts**

```typescript
import { NewUnitOccupant, db } from "..";

export async function addUnitOccupant(occupant: NewUnitOccupant) {
  return db().insertInto("unit_occupants").values(occupant).execute();
}
```

- [ ] **Step 7: Create data/units/removeUnitOccupant.ts**

```typescript
import { db } from "..";

export async function removeUnitOccupant(unitId: string, membershipId: string) {
  return db()
    .deleteFrom("unit_occupants")
    .where("unit_occupants.unitId", "=", unitId)
    .where("unit_occupants.membershipId", "=", membershipId)
    .execute();
}
```

- [ ] **Step 8: Commit**

```bash
git add data/units/
git commit -m "feat: add unit CRUD data functions"
```

---

### Task 6: Navigation — add Units sub-link

**Files:**

- Modify: `constants/navigation.ts`

- [ ] **Step 1: Add Units sub-link and import BuildingIcon**

Add a BuildingIcon import (or reuse an existing icon — use `GroupIcon` since it's already imported). Update the `NAVIGATION_SUB_LINKS` for `/dashboard/membership`:

In `constants/navigation.ts`, replace the `/dashboard/membership` entry in `NAVIGATION_SUB_LINKS`:

```typescript
"/dashboard/membership": [
  {
    href: "/dashboard/membership/units",
    label: "Units",
    icon: GroupIcon,
  },
  {
    href: "/dashboard/membership/pending",
    label: "Pending",
    icon: CycleIcon,
  },
],
```

- [ ] **Step 2: Commit**

```bash
git add constants/navigation.ts
git commit -m "feat: add Units sub-link to directory navigation"
```

---

### Task 7: Settings — levy mode configuration

**Files:**

- Modify: `app/@app/dashboard/settings/SettingsPage.tsx`
- Modify: `app/@app/actions.ts`

- [ ] **Step 1: Add Levies fieldset to SettingsPage.tsx**

After the "Content Visibility" section (after the `RadioButton` for visibility, around line 97), add:

```tsx
<Header as="h3">Levies</Header>
<Text color="secondary">
  Choose how monthly levies are calculated for each unit.
  Entitlement-based splits a total budget by each unit&apos;s
  share value. Custom lets you set each unit&apos;s fee
  directly.
</Text>
<RadioButton
  className={s({ flex: 1 })}
  name="levy_mode"
  options={["entitlement", "custom"]}
  defaultValue={strata.levyMode ?? "entitlement"}
/>
<Input
  name="total_monthly_budget"
  label="Total Monthly Budget"
  type="number"
  min={0}
  placeholder="e.g. 5000"
  defaultValue={strata.totalMonthlyBudget ?? undefined}
/>
```

- [ ] **Step 2: Handle levy fields in updateStrataAction**

In `app/@app/actions.ts`, add form field parsing after the existing fields (around line 36):

```typescript
const levyMode = formdata.getEnum(fd, "levy_mode", ["entitlement", "custom"]);
const totalMonthlyBudgetStr = formdata.getString(fd, "total_monthly_budget");
const totalMonthlyBudget = totalMonthlyBudgetStr
  ? parseInt(totalMonthlyBudgetStr, 10)
  : null;
```

Add these to the `updateStrata` call:

```typescript
await updateStrata(strataId, {
  ...(strataName && { name: strataName }),
  strataId: strataPlanId,
  streetAddress,
  postalCode,
  city,
  provinceState,
  latitude,
  longitude,
  bylawsFileId,
  isPublic: isPublic ? 1 : 0,
  inboxEmail,
  ...(levyMode && { levyMode }),
  totalMonthlyBudget,
});
```

- [ ] **Step 3: Commit**

```bash
git add app/@app/dashboard/settings/SettingsPage.tsx app/@app/actions.ts
git commit -m "feat: add levy mode and total monthly budget to strata settings"
```

---

### Task 8: Units server actions

**Files:**

- Create: `app/@app/dashboard/membership/units/actions.ts`

- [ ] **Step 1: Write unit server actions**

```typescript
"use server";

import { revalidatePath } from "next/cache";

import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { addUnitOccupant } from "../../../../../data/units/addUnitOccupant";
import { createUnit } from "../../../../../data/units/createUnit";
import { deleteUnit } from "../../../../../data/units/deleteUnit";
import { removeUnitOccupant } from "../../../../../data/units/removeUnitOccupant";
import { updateUnit } from "../../../../../data/units/updateUnit";
import { withPermissions } from "../../../../../utils/actions";
import * as formdata from "../../../../../utils/formdata";

export const createUnitAction = withPermissions(
  ["stratas.units.create"],
  async (_, fd: FormData) => {
    const strata = await mustGetCurrentStrata();

    const unitNumber = formdata.getString(fd, "unit_number");
    const entitlementSharesStr = formdata.getString(fd, "entitlement_shares");
    const customMonthlyFeeStr = formdata.getString(fd, "custom_monthly_fee");

    if (!unitNumber) {
      throw new Error("Unit number is required");
    }

    await createUnit({
      strataId: strata.id,
      unitNumber,
      entitlementShares: entitlementSharesStr
        ? parseInt(entitlementSharesStr, 10)
        : 1,
      customMonthlyFee: customMonthlyFeeStr
        ? parseInt(customMonthlyFeeStr, 10)
        : null,
    });

    revalidatePath("/dashboard/membership/units");
  },
);

export const updateUnitAction = withPermissions(
  ["stratas.units.edit"],
  async (_, unitId: string, fd: FormData) => {
    const unitNumber = formdata.getString(fd, "unit_number");
    const entitlementSharesStr = formdata.getString(fd, "entitlement_shares");
    const customMonthlyFeeStr = formdata.getString(fd, "custom_monthly_fee");

    await updateUnit(unitId, {
      ...(unitNumber && { unitNumber }),
      ...(entitlementSharesStr && {
        entitlementShares: parseInt(entitlementSharesStr, 10),
      }),
      customMonthlyFee: customMonthlyFeeStr
        ? parseInt(customMonthlyFeeStr, 10)
        : null,
    });

    revalidatePath("/dashboard/membership/units");
    revalidatePath(`/dashboard/membership/units/${unitId}`);
  },
);

export const deleteUnitAction = withPermissions(
  ["stratas.units.delete"],
  async (_, unitId: string) => {
    await deleteUnit(unitId);
    revalidatePath("/dashboard/membership/units");
  },
);

export const addUnitOccupantAction = withPermissions(
  ["stratas.units.edit"],
  async (_, unitId: string, membershipId: string) => {
    await addUnitOccupant({ unitId, membershipId });
    revalidatePath(`/dashboard/membership/units/${unitId}`);
  },
);

export const removeUnitOccupantAction = withPermissions(
  ["stratas.units.edit"],
  async (_, unitId: string, membershipId: string) => {
    await removeUnitOccupant(unitId, membershipId);
    revalidatePath(`/dashboard/membership/units/${unitId}`);
  },
);
```

- [ ] **Step 2: Commit**

```bash
git add app/@app/dashboard/membership/units/actions.ts
git commit -m "feat: add server actions for unit CRUD and occupant management"
```

---

### Task 9: Units list page

**Files:**

- Create: `app/@app/dashboard/membership/units/page.tsx`
- Create: `app/@app/dashboard/membership/units/UnitsList.tsx`
- Create: `app/@app/dashboard/membership/units/UnitTableRow.tsx`

- [ ] **Step 1: Create the units list page**

`app/@app/dashboard/membership/units/page.tsx`:

```tsx
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
            You have {units.length} units but your plan covers {strata.numUnits}
            . Update your plan to avoid billing adjustments.
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
```

- [ ] **Step 2: Create UnitsList component**

`app/@app/dashboard/membership/units/UnitsList.tsx`:

```tsx
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
```

- [ ] **Step 3: Create UnitTableRow component**

`app/@app/dashboard/membership/units/UnitTableRow.tsx`:

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add app/@app/dashboard/membership/units/page.tsx app/@app/dashboard/membership/units/UnitsList.tsx app/@app/dashboard/membership/units/UnitTableRow.tsx
git commit -m "feat: add units list page with levy calculations"
```

---

### Task 10: Unit detail/edit page

**Files:**

- Create: `app/@app/dashboard/membership/units/[unitId]/page.tsx`

- [ ] **Step 1: Create unit detail page**

```tsx
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
            const { createUnitAction } = await import("../actions");
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
```

- [ ] **Step 2: Commit**

```bash
git add app/@app/dashboard/membership/units/\[unitId\]/page.tsx
git commit -m "feat: add unit detail page with edit, occupant management, and delete"
```

---

### Task 11: Clean up membership — remove monthlyFee and unit references from UI

**Files:**

- Modify: `app/@app/dashboard/membership/Memberships.tsx`
- Modify: `app/@app/dashboard/membership/MembershipTableRow.tsx`
- Modify: `app/@app/dashboard/membership/[userId]/page.tsx`
- Modify: `app/@app/dashboard/membership/actions.ts`
- Modify: `components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields.tsx`

- [ ] **Step 1: Remove monthlyFee totals from Memberships.tsx**

Replace the full file:

```tsx
import { auth } from "../../../../auth";
import { Table } from "../../../../components/Table";
import { Text } from "../../../../components/Text";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { MembershipTableRow } from "./MembershipTableRow";

export async function Memberships() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const memberships = await listStrataMemberships({
    strataId: strata.id,
  });

  return (
    <div>
      <Table>
        {memberships.map((membership) => (
          <MembershipTableRow key={membership.userId} membership={membership} />
        ))}
      </Table>
    </div>
  );
}
```

- [ ] **Step 2: Remove monthlyFee display from MembershipTableRow.tsx**

Replace the full file:

```tsx
import { auth } from "../../../../auth";
import { Badge } from "../../../../components/Badge";
import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { EmailIcon } from "../../../../components/Icon/EmailIcon";
import { PhoneIcon } from "../../../../components/Icon/PhoneIcon";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { ExternalLink } from "../../../../components/Link/ExternalLink";
import { StatusButton } from "../../../../components/StatusButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { StrataMembership } from "../../../../data/memberships/getStrataMembership";
import { can, roleLabels } from "../../../../data/users/permissions";
import { deleteStrataMembershipAction } from "./actions";

interface Props {
  membership: StrataMembership;
}

export async function MembershipTableRow({ membership }: Props) {
  const session = await auth();

  const canUpsert = can(session?.user, "stratas.memberships.edit");

  return (
    <TableRow
      actions={
        <Group gap="xs">
          {membership.email && (
            <ExternalLink href={`mailto:${membership.email}`} noUnderline>
              <Button
                icon={<EmailIcon />}
                style="tertiary"
                color="default"
                size="small"
              />
            </ExternalLink>
          )}
          {membership.phoneNumber && (
            <ExternalLink href={`tel:${membership.phoneNumber}`} noUnderline>
              <Button
                icon={<PhoneIcon />}
                style="tertiary"
                color="default"
                size="small"
              />
            </ExternalLink>
          )}
          {canUpsert && membership.role !== "administrator" && (
            <StatusButton
              action={deleteStrataMembershipAction.bind(
                undefined,
                membership.userId,
              )}
              icon={<RemoveIcon />}
              style="tertiary"
              color="error"
              size="small"
            />
          )}
        </Group>
      }
      content={
        <Group flex={1}>
          <Text fw="bold" whiteSpace="nowrap" color="primary">
            {membership.name}
          </Text>
          <Text color="secondary">{roleLabels[membership.role]}</Text>
        </Group>
      }
      rowId={membership.userId}
      link={`/dashboard/membership/${membership.userId}`}
    />
  );
}
```

- [ ] **Step 3: Remove monthlyFee and unit fields from [userId]/page.tsx**

Remove the "Unit" `DetailsRow` (lines 92-104), the `canEditMonthlyFee` variable (line 56), and both monthlyFee `DetailsRow` blocks (lines 154-174). Also remove the Badge import if unused.

In the `DetailsRow` for "Unit", replace with a read-only display that shows units the member is assigned to (fetched separately). For now, simply remove the unit input and monthlyFee fields. The unit assignment is managed from the unit detail page.

Remove these sections:

- The `const canEditMonthlyFee = ...` line
- The `DetailsRow` with title "Unit" (the entire block from the `<DetailsRow title="Unit"` to its closing `/>`)
- Both `DetailsRow` blocks with title "Monthly Fee"

- [ ] **Step 4: Remove monthlyFee and unit from upsert action**

In `app/@app/dashboard/membership/actions.ts`, in `upsertStrataMembershipAction`:

Remove `const unit = formdata.getString(fd, "unit");` (line 44).

Remove the monthlyFee parsing block (lines 111-116):

```typescript
const monthlyFeeStr = formdata.getString(fd, "monthly_fee");
const monthlyFee =
  !isEditingSelf && monthlyFeeStr !== ""
    ? parseInt(monthlyFeeStr, 10)
    : undefined;
```

Remove `unit,` and `...(monthlyFee !== undefined && { monthlyFee })` from the `updateStrataMembership` call (lines 118-127).

Remove `unit,` from the `createStrataMembership` call (line 166).

- [ ] **Step 5: Remove monthlyFee and unit from CreateOrUpdateStrataMembershipFormFields.tsx**

Remove the `canEditMonthlyFee` prop, the unit `Input`, and the monthlyFee `Input` from this component.

- [ ] **Step 6: Commit**

```bash
git add app/@app/dashboard/membership/ components/CreateOrUpdateStrataMembershipForm/
git commit -m "feat: remove monthlyFee and unit fields from membership UI (moved to units)"
```

---

### Task 12: Verify and fix TypeScript

- [ ] **Step 1: Run TypeScript type checking**

```bash
npm run lint:typescript
```

Expected: May have errors related to the new `levyMode` field on Strata type (since `getStrataByDomain` joins with strata_plans and may not return all strata fields). Fix any type errors.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Fix any lint errors (unused imports, etc.).

- [ ] **Step 3: Run Prettier**

```bash
npm run prettier:fix
```

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve type and lint errors from units feature"
```

---

### Task 13: Manual smoke test

- [ ] **Step 1: Start dev server and verify**

```bash
npm run dev
```

Verify:

1. Settings page shows Levies section with radio toggle and budget input
2. Directory page loads without errors
3. "Units" sub-link appears in directory navigation for admin users
4. Units list page loads at `/dashboard/membership/units`
5. Can create a new unit at `/dashboard/membership/units/new`
6. Can view/edit unit detail page
7. Can assign/remove members from units
8. Levy calculations display correctly in both modes
9. Soft cap warning appears when unit count exceeds numUnits
10. Monthly fee and unit fields are removed from membership pages
