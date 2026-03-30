# Units, Entitlements & Levies — Design Spec

## Overview

Split the "monthly fee" concept off memberships, introduce a concrete `units` table as a first-class entity, and support two levy modes: entitlement-based (proportional shares) and custom per-unit fees. Units are managed under the existing Directory tab as a new sub-tab, visible only to admin roles.

## Data Model

### New table: `units`

| Column              | Type    | Default | Notes                         |
| ------------------- | ------- | ------- | ----------------------------- |
| `id`                | text PK | uuidv7  |                               |
| `strataId`          | text FK |         | → stratas.id, NOT NULL        |
| `unitNumber`        | text    |         | e.g., "101", "PH-2", NOT NULL |
| `entitlementShares` | integer | 1       | Used in entitlement mode      |
| `customMonthlyFee`  | integer | null    | Used in custom mode (cents)   |
| `createdAt`         | integer |         | Unix timestamp                |

Unique constraint on `(strataId, unitNumber)`.

### New table: `unit_occupants`

| Column         | Type      | Notes                             |
| -------------- | --------- | --------------------------------- |
| `unitId`       | text FK   | → units.id, NOT NULL              |
| `membershipId` | text FK   | → strata_memberships.id, NOT NULL |
| PK             | composite | (unitId, membershipId)            |

The occupancy relationship type is derived from the membership's existing `role` field (owner, tenant, resident, etc.).

### Modified table: `strata_memberships`

- Add `id` column (text, uuidv7, UNIQUE, NOT NULL). Existing composite PK `(strataId, userId)` remains.
- Drop `monthlyFee` column (after data migration).
- Drop `unit` column (after data migration).

### Modified table: `stratas`

- Add `levyMode` column: text, NOT NULL, default `"entitlement"`. Values: `"entitlement"` | `"custom"`.
- Add `totalMonthlyBudget` column: integer, nullable. The total monthly amount split by entitlement shares. Only relevant when `levyMode = "entitlement"`.

### New roles

Add `"tenant"` and `"resident"` to the role hierarchy in `permissions.ts`:

```
administrator > president > vice-president > treasurer > secretary > owner > tenant > resident > pending
```

Tenant and resident get the same base permissions as owner (minus anything owner-specific if needed). They can view the directory and their own unit assignment but cannot manage units.

## Permissions

New scope: `units` added to the permissions system.

| Role                                                | Unit permissions  |
| --------------------------------------------------- | ----------------- |
| administrator, president, vice-president, treasurer | `stratas.units.*` |
| secretary                                           | none              |
| owner, tenant, resident                             | none              |
| pending                                             | none              |

The "Units" sub-tab is visible only to users with `stratas.units.view`.

## Levy Modes

### Entitlement-based (`levyMode = "entitlement"`)

Each unit has `entitlementShares` (default 1). The strata has a `totalMonthlyBudget`. Each unit's computed levy is:

```
unitLevy = (unit.entitlementShares / sumOfAllShares) * totalMonthlyBudget
```

Displayed on the unit detail page and in the units list.

### Custom per-unit (`levyMode = "custom"`)

Each unit has a `customMonthlyFee` set directly by an admin. No proportional calculation.

### Switching modes

Admins toggle the mode in strata settings. Both sets of data (`entitlementShares` and `customMonthlyFee`) persist regardless of active mode — switching doesn't destroy data. The UI shows the relevant fields based on the active mode.

## Routes & UI

### Directory tab sub-navigation

Under `/dashboard/membership/`:

- `/dashboard/membership` — Members list (existing, largely unchanged)
- `/dashboard/membership/units` — Units list (new)

Sub-tab navigation rendered at the top of the directory layout. "Members" visible to all; "Units" visible only with `stratas.units.view`.

### Units list page (`/dashboard/membership/units`)

- Table columns: Unit Number, Entitlement Shares (entitlement mode) or Monthly Fee (custom mode), Assigned Members
- Computed levy column in entitlement mode
- **Soft cap warning banner** when `units.count > strata.numUnits`: "You have X units but your plan covers Y. Update your plan to avoid billing adjustments."
- "Add Unit" button
- Row click → unit detail page

### Unit detail page (`/dashboard/membership/units/[unitId]`)

- Edit: unit number, entitlement shares, custom monthly fee
- Member assignment: add/remove members from this unit (select from existing strata members)
- Shows computed monthly levy based on active mode
- Delete unit action

### Strata settings additions

New "Levies" fieldset in the settings page:

- **Levy Mode** — radio: "Entitlement-based" / "Custom per-unit"
- **Total Monthly Budget** — number input, shown only when mode is "entitlement"

## Migration: `039_units_and_entitlements.sql`

Execution order:

1. Add `id` column (text) to `strata_memberships` with UNIQUE constraint. Existing rows need `id` values populated via application code (D1 SQL cannot generate uuidv7). New memberships will set `id` at insert time in `createStrataMembership`.
2. Create `units` table.
3. Create `unit_occupants` table.
4. Add `levyMode` (text, default "entitlement") and `totalMonthlyBudget` (integer, nullable) to `stratas`.
5. **Data migration**: For each membership with a non-null `unit` value:
   - Create a unit row with that `unitNumber` (deduplicate by strataId + unit string).
   - Create a unit_occupant row linking the membership to the unit.
   - If the membership has a `monthlyFee`, set it as `customMonthlyFee` on the unit.
6. Drop `monthlyFee` column from `strata_memberships`.
7. Drop `unit` column from `strata_memberships`.

Role changes ("tenant", "resident") are code-only — the `role` column is already a text field accepting any string.

## Out of Scope

- Automatic invoice generation from levies
- Recurring/scheduled levy collection
- Special levies / one-time assessments
- Arrears tracking
- Operating vs. reserve fund separation
