"use server";

import { revalidatePath } from "next/cache";

import { updateStrataMembership } from "../../../../../data/strataMemberships/updateStrataMembership";
import { updateStrata } from "../../../../../data/stratas/updateStrata";

export async function updateStrataAction(formData: FormData) {
  const id = formData.get("id");
  const strataId = formData.get("strata_id") || "";
  const streetAddress = formData.get("strata_address_street_address") || "";
  const postalCode = formData.get("strata_address_postal_code") || "";
  const provinceState = formData.get("strata_address_province_state") || "";
  const strataName = formData.get("name");
  const isPublic = formData.get("is_public") === "on";

  if (
    typeof id !== "string" ||
    id === "" ||
    typeof strataId !== "string" ||
    typeof streetAddress !== "string" ||
    typeof postalCode !== "string" ||
    typeof provinceState !== "string" ||
    typeof strataName !== "string" ||
    strataName === ""
  ) {
    throw new Error("invalid fields");
  }

  await updateStrata(id, {
    name: strataName,
    strataId,
    streetAddress,
    postalCode,
    provinceState,
    isPublic: isPublic ? 1 : 0,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
}

export async function approveStrataMembershipAction(
  strataId: string,
  memberId: string,
) {
  await updateStrataMembership(strataId, memberId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
