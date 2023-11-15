"use server";

import { revalidatePath } from "next/cache";
import { createStrataMember } from "../../../../../data/members/createStrataMember";
import { deleteStrataMember } from "../../../../../data/members/deleteStrataMember";
import { updateStrataMember } from "../../../../../data/members/updateStrataMember";
import { createMember } from "../../../../../data/members/createMember";

export async function deleteStrataMemberAction(
  strataId: string,
  memberId: string
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

  const memberId = await createMember(email, password);

  if (!memberId) {
    throw new Error("nope");
  }

  await createStrataMember(strataId, memberId, {
    email,
    name,
    phoneNumber,
    unit,
    role,
  });

  revalidatePath("/dashboard/membership");
}

export async function approveStrataMembershipAction(
  strataId: string,
  memberId: string
) {
  await updateStrataMember(strataId, memberId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
