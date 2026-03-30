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
