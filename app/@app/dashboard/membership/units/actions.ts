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
