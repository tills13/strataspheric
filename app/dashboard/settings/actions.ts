"use server";

import { revalidatePath } from "next/cache";
import { updateStrataMember } from "../../../data/members/updateStrataMember";
import { updateStrata } from "../../../data/stratas/updateStrata";

export async function updateStrataAction(formData: FormData) {
  const strataId = formData.get("strata_id");
  const strataName = formData.get("name");
  const visibility = formData.get("is_public") === "on" ? "public" : "private";

  if (
    typeof strataId !== "string" ||
    strataId === "" ||
    typeof strataName !== "string" ||
    strataName === ""
  ) {
    throw new Error("invalid fields");
  }

  await updateStrata(strataId, { name: strataName, visibility });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
}

export async function approveStrataMembershipAction(
  strataId: string,
  memberId: string
) {
  await updateStrataMember(strataId, memberId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
