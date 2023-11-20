"use server";

import { revalidatePath } from "next/cache";

import { createStrataMembership } from "../../../../../db/strataMemberships/createStrataMembership";
import { deleteStrataMember } from "../../../../../db/strataMemberships/deleteStrataMember";
import { updateStrataMembership } from "../../../../../db/strataMemberships/updateStrataMembership";
import { createUser } from "../../../../../db/users/createUser";

export async function deleteStrataMemberAction(
  strataId: string,
  memberId: string,
) {
  await deleteStrataMember(strataId, memberId);
  revalidatePath("/dashboard/membership");
}

export async function createStrataMemberAction(formData: FormData) {
  const strataId = formData.get("strata_id");
  const email = formData.get("email");
  const name = formData.get("name");
  const phoneNumber = formData.get("phone_number");
  const unit = formData.get("unit");
  const role = formData.get("role");
  const password = formData.get("password") || "";

  if (
    typeof strataId !== "string" ||
    strataId === "" ||
    typeof email !== "string" ||
    email === "" ||
    typeof name !== "string" ||
    name === "" ||
    typeof phoneNumber !== "string" ||
    phoneNumber === "" ||
    typeof unit !== "string" ||
    unit === "" ||
    typeof role !== "string" ||
    role === "" ||
    typeof password !== "string"
  ) {
    throw new Error("invalid fields");
  }

  const { id: userId } = await createUser({ email, password });

  if (!userId) {
    throw new Error("nope");
  }

  await createStrataMembership({
    strataId,
    userId,
    email,
    name,
    phoneNumber,
    unit,
    role: role as any,
  });

  revalidatePath("/dashboard/membership");
}

export async function approveStrataMembershipAction(
  strataId: string,
  userId: string,
) {
  await updateStrataMembership(strataId, userId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
